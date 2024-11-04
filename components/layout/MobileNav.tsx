import Popover from '@/components/ui/Popover'

export default function MobileNav({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <Popover.Button
        id='menu-btn'
        className='mobile-nav-button hamburger mt-2 block rounded-full focus:outline-none md:hidden'
      >
        <span className='hamburger-top'></span>
        <span className='hamburger-middle'></span>
        <span className='hamburger-bottom'></span>
      </Popover.Button>
      <Popover.Content>{children}</Popover.Content>
    </Popover>
  )
}
