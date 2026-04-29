import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { env, hasSupabasePublicEnv } from '@/lib/env'

export async function getSupabaseServerClient() {
  if (!hasSupabasePublicEnv()) return null

  const cookieStore = await cookies()
  return createServerClient(env.supabaseUrl!, env.supabasePublishableKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Components cannot set cookies. Route handlers/actions can.
        }
      },
    },
  })
}
