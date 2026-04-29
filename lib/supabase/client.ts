'use client'

import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'

export function createSupabaseBrowserClient() {
  if (!env.supabaseUrl || !env.supabasePublishableKey) {
    throw new Error('Supabase browser env vars are not configured')
  }

  return createBrowserClient(env.supabaseUrl, env.supabasePublishableKey)
}
