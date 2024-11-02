import { type VariantProps, cva } from 'class-variance-authority'

const variants = cva(
  [
    'cursor-pointer',
    'text-center',
    'text-sm',
    'font-semibold',
    'disabled:cursor-default',
  ],
  {
    variants: {
      intent: {
        primary: [
          'rounded-md',
          'bg-primary',
          'text-white',
          'disabled:bg-primary-light',
          'hover:drop-shadow-md',
          'dark:hover:bg-primary-dark',
        ],
        secondary: [
          'rounded-md',
          'bg-slate-100',
          'text-secondary-dark',
          'hover:drop-shadow-md',
          'dark:bg-slate-700',
          'dark:text-secondary-light',
          'dark:hover:bg-slate-600',
        ],
        minimal: [
          'text-slate-500',
          'hover:text-slate-700',
          'dark:text-slate-100',
          'dark:hover:text-slate-300',
        ],
        icon: [
          'rounded-full',
          'flex',
          'items-center',
          'justify-center',
          'hover:bg-slate-50',
          'hover:drop-shadow-md',
          'dark:hover:bg-slate-800',
        ],
      },
      size: {
        default: 'h-9 px-4 py-2',
        fullWidth: 'w-full min-w-32 h-9 px-4 py-2',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'default',
    },
  }
)

interface Props
  extends React.ComponentPropsWithRef<'button'>,
    VariantProps<typeof variants> {}

export default function Button({
  children,
  ref,
  intent,
  size,
  ...props
}: Props) {
  return (
    <button ref={ref} {...props} className={variants({ intent, size })}>
      {children}
    </button>
  )
}
