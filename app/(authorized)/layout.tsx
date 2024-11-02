import { getUser } from '@/lib/auth'

import Header from '@/components/Header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = getUser()
  const appName = process.env.APP_NAME ?? 'App'

  return (
    <>
      <Header appName={appName} promisedUser={user} />
      <main>{children}</main>
    </>
  )
}
