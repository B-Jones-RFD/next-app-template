'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from '../actions'

import { Root } from '@radix-ui/react-form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/Spinner'

export default function Login({}) {
  const [state, formAction, isPending] = useActionState(signIn, { error: '' })
  const params = useSearchParams()
  const redirect = params.get('redirect')

  return (
    <Root action={formAction} className='max-w-sm space-y-4 px-8'>
      <Input
        label='Username'
        name='username'
        type='username'
        autoComplete='username'
      />
      <Input
        label='Password'
        name='password'
        type='password'
        autoComplete='current-password'
        required
      />
      <input type='hidden' name='redirect' value={redirect ?? undefined} />
      <Button
        type='submit'
        disabled={isPending || !!state.error}
        size='fullWidth'
      >
        {isPending ? <LoadingSpinner /> : 'Sign In'}
      </Button>
    </Root>
  )
}
