import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { compare, hash } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

type SessionData = {
  user: { id: string }
  expires: string
}

export const SESSION_KEY = 'sesson'
const sessionSecret = process.env.AUTH_SECRET
const encodedKey = new TextEncoder().encode(sessionSecret)
const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS)
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword)
}

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(encodedKey)
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, encodedKey, {
    algorithms: ['HS256'],
  })
  return payload as SessionData
}

export async function getSession() {
  const session = (await cookies()).get(SESSION_KEY)?.value
  if (!session) return null
  return await verifyToken(session)
}

export async function setSession(user: string) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session: SessionData = {
    user: { id: user },
    expires: expiresInOneDay.toISOString(),
  }
  const encryptedSession = await signToken(session)
  const cookieStore = await cookies()

  cookieStore.set(SESSION_KEY, encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(SESSION_KEY)

  if (!cookie || !cookie.value) {
    return redirect('./sign-in')
  }

  const session = await verifyToken(cookie.value)

  if (!session?.user) {
    return redirect('./sign-in')
  }

  return { isAuth: true, user: session.user }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  return session.user
})
