'use server'

import { cookies } from 'next/headers'
import { SESSION_KEY, setSession } from '@/lib/auth'
import { CredentialsSchema } from '@/lib/auth/schema'
import { redirect } from 'next/navigation'

export type FormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_KEY)
}

export async function signIn(state: FormState, formData: FormData) {
  const validated = CredentialsSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    }
  }

  // TODO:  Validate user here using authorization source

  await setSession(validated.data.username)
  const redirectTo = formData.get('redirect') as string | null
  redirect(!!redirectTo ? redirectTo : '/')
}
