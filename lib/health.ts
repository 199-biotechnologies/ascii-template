import { version as nextVersion } from 'next/package.json'
import { env, hasResendEnv, hasSupabaseAdminEnv, hasSupabasePublicEnv } from '@/lib/env'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export type HealthCheck = {
  name: string
  ok: boolean
  message: string
  details?: Record<string, unknown>
}

export type HealthReport = {
  status: 'ok' | 'degraded' | 'fail'
  checkedAt: string
  checks: HealthCheck[]
  build: {
    nodeEnv: string
    nextVersion: string
    vercelEnv?: string
    commit?: string
  }
}

const HEALTH_CHECK_TIMEOUT_MS = 2500

async function withTimeout<T>(work: PromiseLike<T>, label: string): Promise<{ ok: true; value: T } | { ok: false; error: string }> {
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      Promise.resolve(work).then((value) => ({ ok: true as const, value })),
      new Promise<{ ok: false; error: string }>((resolve) => {
        timeout = setTimeout(
          () => resolve({ ok: false, error: `${label} timed out after ${HEALTH_CHECK_TIMEOUT_MS}ms.` }),
          HEALTH_CHECK_TIMEOUT_MS,
        )
      }),
    ])
  } finally {
    if (timeout) clearTimeout(timeout)
  }
}

export async function getHealthReport(): Promise<HealthReport> {
  const checks: HealthCheck[] = []

  checks.push({
    name: 'base_url',
    ok: Boolean(env.siteUrl),
    message: env.siteUrl ? 'Base URL configured.' : 'NEXT_PUBLIC_BASE_URL is missing.',
  })

  checks.push({
    name: 'supabase_public_env',
    ok: hasSupabasePublicEnv(),
    message: hasSupabasePublicEnv() ? 'Supabase public env is configured.' : 'Supabase public env is missing.',
  })

  checks.push({
    name: 'supabase_service_role',
    ok: hasSupabaseAdminEnv(),
    message: hasSupabaseAdminEnv() ? 'Supabase service role env is configured.' : 'SUPABASE_SERVICE_ROLE_KEY is missing.',
  })

  checks.push({
    name: 'admin_emails',
    ok: env.adminEmails.length > 0,
    message: env.adminEmails.length ? 'Admin allow-list configured.' : 'ADMIN_EMAILS is missing.',
  })

  checks.push({
    name: 'resend',
    ok: hasResendEnv(),
    message: hasResendEnv() ? 'Resend API key configured.' : 'RESEND_API_KEY is missing.',
  })

  const admin = getSupabaseAdmin()
  if (!admin) {
    checks.push({
      name: 'supabase_connection',
      ok: false,
      message: 'Supabase admin client could not be created.',
    })
  } else {
    const tables = [
      'contacts',
      'inquiries',
      'messages',
      'analytics_events',
      'admin_users',
      'files',
      'seo_entries',
      'redirects',
      'settings',
      'audit_logs',
      'rate_limits',
      'template_migrations',
    ]

    const tableResults = await Promise.all(
      tables.map(async (table) => {
        const result = await withTimeout(admin.from(table).select('*', { count: 'exact', head: true }), table)
        if (!result.ok) return { table, ok: false, error: result.error }
        const { error } = result.value
        return { table, ok: !error, error: error?.message }
      }),
    )

    const missingTables = tableResults.filter((result) => !result.ok)
    checks.push({
      name: 'supabase_schema',
      ok: missingTables.length === 0,
      message: missingTables.length ? 'One or more core tables are unavailable.' : 'Core tables are available.',
      details: missingTables.length ? { missingTables } : undefined,
    })

    const migrationResult = await withTimeout(
      admin.from('template_migrations').select('key, applied_at').eq('key', 'ascii-template-core-v1').maybeSingle(),
      'migration_marker',
    )
    const migration = migrationResult.ok ? migrationResult.value.data : null
    const migrationError = migrationResult.ok ? migrationResult.value.error : { message: migrationResult.error }

    checks.push({
      name: 'migration_marker',
      ok: Boolean(migration && !migrationError),
      message: migration ? 'ASCII Template migration marker found.' : 'Migration marker not found.',
      details: migrationError ? { error: migrationError.message } : migration ? { appliedAt: migration.applied_at } : undefined,
    })

    const bucketResult = await withTimeout(admin.storage.listBuckets(), 'storage_buckets')
    const buckets = bucketResult.ok ? bucketResult.value.data : null
    const bucketError = bucketResult.ok ? bucketResult.value.error : { message: bucketResult.error }
    const bucketNames = new Set((buckets ?? []).map((bucket) => bucket.name))
    checks.push({
      name: 'storage_buckets',
      ok: !bucketError && bucketNames.has('site-assets') && bucketNames.has('private-uploads'),
      message:
        !bucketError && bucketNames.has('site-assets') && bucketNames.has('private-uploads')
          ? 'Default storage buckets exist.'
          : 'Default storage buckets are missing.',
      details: bucketError ? { error: bucketError.message } : { buckets: [...bucketNames] },
    })
  }

  const failed = checks.filter((check) => !check.ok)
  const status = failed.length === 0 ? 'ok' : failed.some((check) => check.name.startsWith('supabase')) ? 'fail' : 'degraded'

  return {
    status,
    checkedAt: new Date().toISOString(),
    checks,
    build: {
      nodeEnv: env.nodeEnv,
      nextVersion,
      vercelEnv: process.env.VERCEL_ENV,
      commit: process.env.VERCEL_GIT_COMMIT_SHA,
    },
  }
}
