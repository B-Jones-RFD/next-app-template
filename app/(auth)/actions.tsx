'use server'

import { cookies } from 'next/headers'
import { SESSION_KEY, setSession } from '@/lib/auth'
import { validatedAction } from '@/lib/auth/middleware'
import { CredentialsSchema } from '@/lib/auth/schema'
import { redirect } from 'next/navigation'

export async function signOut() {
  const _cookies = await cookies()
  _cookies.delete(SESSION_KEY)
}

export const signIn = validatedAction(
  CredentialsSchema,
  async (data, formData) => {
    const { username, password } = data

    // TODO:  Validate user here using authorization source

    await setSession(username)
    const redirectTo = formData.get('redirect') as string | null
    redirect(!!redirectTo ? redirectTo : '/')
  }
)
