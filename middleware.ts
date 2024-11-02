import { type NextRequest, NextResponse } from 'next/server'
import { SESSION_KEY, signToken, verifyToken } from '@/lib/auth'

const protectedRoutes = ['/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get(SESSION_KEY)
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const searchParams = new URLSearchParams({
    redirect: pathname,
  })

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(
      new URL(`/sign-in?${searchParams.toString()}`, request.url)
    )
  }

  let res = NextResponse.next()

  if (sessionCookie) {
    try {
      const parsed = await verifyToken(sessionCookie.value)
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000)

      res.cookies.set({
        name: SESSION_KEY,
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString(),
        }),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresInOneDay,
      })
    } catch (error) {
      console.error('Error updating session:', error)
      res.cookies.delete(SESSION_KEY)
      if (isProtectedRoute) {
        return NextResponse.redirect(
          new URL(`/sign-in?${searchParams.toString()}`, request.url)
        )
      }
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
