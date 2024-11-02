import 'server-only'
import { compare, hash } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

type SessionData = {
  user: { id: string }
  expires: string
}

export const SESSION_KEY = 'sesson'
// TODO: env
const KEY = new TextEncoder().encode(process.env.AUTH_SECRET)
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
    .sign(KEY)
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, KEY, {
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

  ;(await cookies()).set(SESSION_KEY, encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getUser() {
  const sessionCookie = (await cookies()).get(SESSION_KEY)
  if (!sessionCookie || !sessionCookie.value) {
    return null
  }

  const sessionData = await verifyToken(sessionCookie.value)
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'string'
  ) {
    return null
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null
  }

  return sessionData.user
}
