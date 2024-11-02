import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

import Image from 'next/image'
import Login from './Login'
import Page from '@/components/ui/Page'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const appName = process.env.APP_NAME ?? 'My App'
  const session = await getSession()
  const { redirectTo } = await searchParams
  if (session) {
    const to = redirectTo && !Array.isArray(redirectTo) ? redirectTo : '/'
    redirect(to)
  }

  return (
    <Page>
      <Page.Overlay />
      <Page.Background>
        <Image
          src='/background.png'
          alt='Background image'
          fill
          quality={100}
          sizes='100vw'
          style={{
            objectFit: 'cover',
          }}
        />
      </Page.Background>
      <Page.Portal>
        <h1 className='mb-8 text-center font-serif text-2xl font-bold'>
          {appName}
        </h1>
        <Login />
      </Page.Portal>
    </Page>
  )
}
