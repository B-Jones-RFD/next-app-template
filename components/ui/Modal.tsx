import * as Dialog from '@radix-ui/react-dialog'

export default function Modal({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

function ModalContent({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/50' />
      <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow dark:bg-slate-900'>
        <div id='header' className='mb-4 flex items-center justify-between'>
          <Dialog.Title className='font-semibold text-secondary-dark dark:text-secondary-light'>
            {title}
          </Dialog.Title>
          <Dialog.Close className='stroke-slate-500 hover:stroke-slate-600 dark:stroke-slate-100 hover:dark:stroke-slate-200'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </Dialog.Close>
        </div>
        <Dialog.Description className='text-sm text-secondary-dark dark:text-secondary-light'>
          {description}
        </Dialog.Description>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

Modal.Button = Dialog.Trigger
Modal.Content = ModalContent
