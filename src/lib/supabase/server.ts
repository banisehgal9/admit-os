import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

/**
 * Server-side Supabase client with cookie read/write.
 * - `get` works everywhere
 * - `set`/`remove` work in Server Actions & Route Handlers (writeable contexts)
 */
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Next App Router supports this signature in writeable contexts
            cookieStore.set(name, value, options)
          } catch {
            // ignore in read-only contexts
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 })
          } catch {
            // ignore in read-only contexts
          }
        },
      },
    }
  )
}
