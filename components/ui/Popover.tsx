import * as RadixPopover from '@radix-ui/react-popover'

export default function Popover({ children }: { children: React.ReactNode }) {
  return <RadixPopover.Root>{children}</RadixPopover.Root>
}

function PopoverContent({ children }: { children: React.ReactNode }) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className='rounded-xl border border-slate-100 data-[state=closed]:data-[side=bottom]:animate-slide-out-left data-[state=open]:data-[side=bottom]:animate-slide-in-right dark:border-none dark:bg-slate-900'
        align='start'
        hideWhenDetached
        sideOffset={5}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
}

Popover.Button = RadixPopover.Trigger
Popover.Content = PopoverContent
