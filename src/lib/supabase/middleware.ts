import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Fetch authenticated user with safety try-catch
  let user = null
  try {
    // กำหนด timeout หรือการดึงข้อมูลอย่างปลอดภัยเพื่อไม่ให้ Edge Function ค้าง
    const { data, error } = await Promise.race([
      supabase.auth.getUser(),
      new Promise<{ data: { user: null }; error: Error }>((_, reject) =>
        setTimeout(() => reject(new Error('Supabase Auth Timeout')), 8000)
      )
    ])
    if (!error && data) {
      user = data.user
    }
  } catch (e) {
    console.error('Supabase middleware auth error:', e)
  }
  const pathname = request.nextUrl.pathname

  // Protected student routes (exclude parent portal)
  if (pathname.startsWith('/student') && pathname !== '/student/parent' && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Protected admin routes
  if (pathname.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect logged-in users away from auth pages
  if ((pathname === '/login' || pathname === '/register' || pathname === '/forgot-password') && user) {
    const url = request.nextUrl.clone()
    // Check role from JWT claim
    const role = user.user_metadata?.role ?? 'student'
    url.pathname = role === 'admin' ? '/admin/dashboard' : '/student/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
