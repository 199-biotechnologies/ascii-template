import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { env, hasSupabasePublicEnv } from '@/lib/env'

export async function updateSupabaseSession(request: NextRequest) {
  if (!hasSupabasePublicEnv()) {
    return NextResponse.next()
  }

  let response = NextResponse.next()

  const supabase = createServerClient(env.supabaseUrl!, env.supabasePublishableKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next()
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  await supabase.auth.getClaims()
  return response
}
