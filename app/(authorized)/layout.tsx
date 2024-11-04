import { getUser } from '@/lib/auth'

import Page from '@/components/layout/Page'
import Header from '@/components/layout/Header'
import Nav from '@/components/Nav'

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
      <Page>
        <Page.DesktopSidebar>
          <Nav />
        </Page.DesktopSidebar>
        {children}
      </Page>
    </>
  )
}
