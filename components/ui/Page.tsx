import { type VariantProps, cva } from 'class-variance-authority'

import * as RadixPortal from '@radix-ui/react-portal'

const portalVariants = cva(['fixed z-10 bg-background p-8 rounded-md'], {
  variants: {
    position: {
      centered: ['left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2'],
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
  return <main>{children}</main>
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

Page.Overlay = Overlay
Page.Background = Background
Page.Portal = Portal
