import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { env, hasSupabasePublicEnv } from '@/lib/env'

export type AdminState =
  | { status: 'unconfigured' }
  | { status: 'anonymous' }
  | { status: 'forbidden'; email?: string }
  | { status: 'ok'; email: string; userId: string; role: string }

export async function getAdminState(): Promise<AdminState> {
  if (!hasSupabasePublicEnv()) return { status: 'unconfigured' }

  const supabase = await getSupabaseServerClient()
  if (!supabase) return { status: 'unconfigured' }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) return { status: 'anonymous' }

  const email = user.email.toLowerCase()
  if (env.adminEmails.includes(email)) {
    return { status: 'ok', email, userId: user.id, role: 'owner' }
  }

  const admin = getSupabaseAdmin()
  if (!admin) return { status: 'forbidden', email }

  const { data } = await admin
    .from('admin_users')
    .select('role, active')
    .or(`user_id.eq.${user.id},email.eq.${email}`)
    .maybeSingle()

  if (data?.active) {
    return { status: 'ok', email, userId: user.id, role: data.role || 'admin' }
  }

  return { status: 'forbidden', email }
}

export async function getAdminMetrics() {
  const admin = getSupabaseAdmin()
  if (!admin) return null

  const [contacts, inquiries, events, files] = await Promise.all([
    admin.from('contacts').select('id', { count: 'exact', head: true }),
    admin.from('inquiries').select('id', { count: 'exact', head: true }),
    admin.from('analytics_events').select('id', { count: 'exact', head: true }),
    admin.from('files').select('id', { count: 'exact', head: true }),
  ])

  return {
    contacts: contacts.count ?? 0,
    inquiries: inquiries.count ?? 0,
    events: events.count ?? 0,
    files: files.count ?? 0,
  }
}
