'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/app/(auth)/actions'

import Image from 'next/image'
import Link from 'next/link'
import Button from './ui/Button'

export default function Header({
  appName,
  promisedUser,
}: {
  appName: string
  promisedUser: Promise<{
    id: string
  } | null>
}) {
  const router = useRouter()
  const user = use(promisedUser)

  async function handleSignOut() {
    await signOut()
    router.push('/sign-in')
  }

  return (
    <header className='flex-none'>
      <div className='m-2 flex items-center justify-between'>
        <Link href='/' className='mx-2 flex items-center space-x-2'>
          <Image
            className='dark:invert'
            src='/app.svg'
            alt='App Icon'
            width={20}
            height={20}
          />
          <h1 className='text-2xl'>{appName}</h1>
        </Link>
        {user && (
          <form action={handleSignOut} className='mx-2'>
            <Button type='submit' size='icon' intent='icon'>
              <Image
                className='dark:invert'
                src='/sign-out.svg'
                alt='Sign Out Icon'
                width={25}
                height={25}
              />
            </Button>
          </form>
        )}
      </div>
    </header>
  )
}
