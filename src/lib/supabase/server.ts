// lib/supabase/server.ts — Server client (Server Components & API Routes)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() { 
          const store = await cookieStore
          return store.getAll() 
        },
        async setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          try {
            const store = await cookieStore
            cookiesToSet.forEach(({ name, value, options }) =>
              store.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}

// Service role client (Admin operations only)
export function createAdminClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        async getAll() { 
          const store = await cookieStore
          return store.getAll() 
        },
        async setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          try {
            const store = await cookieStore
            cookiesToSet.forEach(({ name, value, options }) =>
              store.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}

