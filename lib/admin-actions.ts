'use server'

import { revalidatePath } from 'next/cache'
import { getAdminState } from '@/lib/admin'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { defaultLocale, isLocale } from '@/lib/i18n/config'

const statuses = new Set(['new', 'open', 'waiting', 'resolved', 'closed'])
const priorities = new Set(['low', 'normal', 'high', 'urgent'])

async function requireAdmin() {
  const state = await getAdminState()
  if (state.status !== 'ok') {
    throw new Error('Admin access required')
  }
  const admin = getSupabaseAdmin()
  if (!admin) {
    throw new Error('Supabase admin client is not configured')
  }
  return { admin, state }
}

function pathFromForm(formData: FormData) {
  const locale = String(formData.get('locale') || defaultLocale)
  return `/${isLocale(locale) ? locale : defaultLocale}/admin`
}

function parseJson(value: string) {
  if (!value.trim()) return {}
  return JSON.parse(value)
}

export async function updateInquiryAction(formData: FormData) {
  const { admin, state } = await requireAdmin()
  const id = String(formData.get('id') || '')
  const status = String(formData.get('status') || 'new')
  const priority = String(formData.get('priority') || 'normal')
  const assignedTo = String(formData.get('assigned_to') || '').trim() || null
  const localePath = pathFromForm(formData)

  if (!id || !statuses.has(status) || !priorities.has(priority)) return

  const payload: Record<string, unknown> = {
    status,
    priority,
    assigned_to: assignedTo,
    updated_at: new Date().toISOString(),
  }
  if (status === 'resolved' || status === 'closed') {
    payload.resolved_at = new Date().toISOString()
  }

  await admin.from('inquiries').update(payload).eq('id', id)
  await admin.from('audit_logs').insert({
    actor_type: 'admin',
    actor_id: state.email,
    action: 'inquiry.updated',
    entity_type: 'inquiry',
    entity_id: id,
    metadata: { status, priority },
  })

  revalidatePath(localePath)
  revalidatePath(`${localePath}/inquiries`)
}

export async function upsertSeoEntryAction(formData: FormData) {
  const { admin, state } = await requireAdmin()
  const id = String(formData.get('id') || '').trim()
  const locale = String(formData.get('entry_locale') || defaultLocale)
  const path = String(formData.get('path') || '').trim()
  const title = String(formData.get('title') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const canonicalPath = String(formData.get('canonical_path') || '').trim() || null
  const ogTitle = String(formData.get('og_title') || '').trim() || null
  const ogDescription = String(formData.get('og_description') || '').trim() || null
  const keywords = String(formData.get('keywords') || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)
  const noindex = formData.get('noindex') === 'on'
  const localePath = pathFromForm(formData)

  if (!isLocale(locale) || !path || !title || !description) return

  const payload = {
    locale,
    path,
    title,
    description,
    canonical_path: canonicalPath,
    og_title: ogTitle,
    og_description: ogDescription,
    keywords,
    noindex,
    updated_by: state.email,
    updated_at: new Date().toISOString(),
  }

  if (id) {
    await admin.from('seo_entries').update(payload).eq('id', id)
  } else {
    await admin.from('seo_entries').upsert(payload, { onConflict: 'locale,path' })
  }

  await admin.from('audit_logs').insert({
    actor_type: 'admin',
    actor_id: state.email,
    action: 'seo.upserted',
    entity_type: 'seo_entry',
    entity_id: id || `${locale}:${path}`,
    metadata: { locale, path },
  })

  revalidatePath(`${localePath}/seo`)
}

export async function upsertRedirectAction(formData: FormData) {
  const { admin, state } = await requireAdmin()
  const id = String(formData.get('id') || '').trim()
  const sourcePath = String(formData.get('source_path') || '').trim()
  const targetPath = String(formData.get('target_path') || '').trim()
  const statusCode = Number(formData.get('status_code') || 308)
  const active = formData.get('active') === 'on'
  const localePath = pathFromForm(formData)

  if (!sourcePath || !targetPath || ![301, 302, 307, 308].includes(statusCode)) return

  const payload = {
    source_path: sourcePath,
    target_path: targetPath,
    status_code: statusCode,
    active,
  }

  if (id) {
    await admin.from('redirects').update(payload).eq('id', id)
  } else {
    await admin.from('redirects').upsert(payload, { onConflict: 'source_path' })
  }

  await admin.from('audit_logs').insert({
    actor_type: 'admin',
    actor_id: state.email,
    action: 'redirect.upserted',
    entity_type: 'redirect',
    entity_id: id || sourcePath,
    metadata: payload,
  })

  revalidatePath(`${localePath}/redirects`)
}

export async function upsertSettingAction(formData: FormData) {
  const { admin, state } = await requireAdmin()
  const key = String(formData.get('key') || '').trim()
  const value = String(formData.get('value') || '').trim()
  const description = String(formData.get('description') || '').trim() || null
  const localePath = pathFromForm(formData)

  if (!key) return

  let parsed: unknown
  try {
    parsed = parseJson(value)
  } catch {
    parsed = value
  }

  await admin.from('settings').upsert(
    {
      key,
      value: parsed,
      description,
      updated_by: state.email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'key' },
  )

  await admin.from('audit_logs').insert({
    actor_type: 'admin',
    actor_id: state.email,
    action: 'setting.upserted',
    entity_type: 'setting',
    entity_id: key,
  })

  revalidatePath(`${localePath}/settings`)
}

export async function deleteAdminRowAction(formData: FormData) {
  const { admin, state } = await requireAdmin()
  const table = String(formData.get('table') || '')
  const id = String(formData.get('id') || '')
  const localePath = pathFromForm(formData)
  const allowed = new Set(['seo_entries', 'redirects'])

  if (!allowed.has(table) || !id) return

  await admin.from(table).delete().eq('id', id)
  await admin.from('audit_logs').insert({
    actor_type: 'admin',
    actor_id: state.email,
    action: `${table}.deleted`,
    entity_type: table,
    entity_id: id,
  })

  revalidatePath(localePath)
}
