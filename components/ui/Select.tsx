import { Field, Label, Control, Message } from '@radix-ui/react-form'

interface Props extends React.ComponentPropsWithRef<'select'> {
  name: string
  label: string
  error?: string | undefined
}

export default function Select(props: Props) {
  const {
    name,
    label,
    ref,
    children,
    className,
    error = undefined,
    ...rest
  } = props
  return (
    <Field
      name={name}
      className='flex flex-col space-y-2 text-sm text-secondary-dark dark:text-secondary-light'
    >
      <Label className='font-bold'>{label}</Label>
      <Control asChild>
        <select
          ref={ref}
          {...rest}
          className={`rounded-md border bg-inherit p-1 dark:border-slate-100 ${className}`}
        >
          {children}
        </select>
      </Control>
      {error && <Message>{error}</Message>}
    </Field>
  )
}
