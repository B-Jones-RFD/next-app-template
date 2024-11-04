import { type VariantProps, cva } from 'class-variance-authority'

import * as RadixPortal from '@radix-ui/react-portal'

const portalVariants = cva(['fixed z-10 bg-background p-8 rounded-md'], {
  variants: {
    position: {
      centered: [
        'left-1/2',
        'top-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'w-full',
        'max-w-sm',
      ],
    },
    elevation: {
      floating: ['drop-shadow-xl'],
      default: [],
    },
  },
  defaultVariants: {
    position: 'centered',
    elevation: 'default',
  },
})

interface PortalProps
  extends React.ComponentPropsWithRef<'div'>,
    VariantProps<typeof portalVariants> {}

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className='col-span-12 grid sm:col-span-10 xl:col-span-11'>
      {children}
    </main>
  )
}

function Background({ children }: { children: React.ReactNode }) {
  return <div className='fixed inset-0 -z-50'>{children}</div>
}

function Overlay() {
  return <div className='fixed inset-0 -z-40 bg-black/50'></div>
}

function Portal({ children, ref, position, elevation, ...props }: PortalProps) {
  return (
    <RadixPortal.Root asChild>
      <div
        ref={ref}
        {...props}
        className={portalVariants({ position, elevation })}
      >
        {children}
      </div>
    </RadixPortal.Root>
  )
}

function DesktopSidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className='hidden md:col-span-2 md:block lg:col-span-1'>
      {children}
    </aside>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <article className='col-span-12 md:col-span-10 lg:col-span-11'>
      {children}
    </article>
  )
}

Page.Overlay = Overlay
Page.Background = Background
Page.Portal = Portal
Page.DesktopSidebar = DesktopSidebar
Page.Content = Content
