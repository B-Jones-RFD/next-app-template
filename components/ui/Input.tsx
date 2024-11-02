import { Field, Label, Control, Message } from '@radix-ui/react-form'

interface Props extends React.ComponentPropsWithRef<'input'> {
  name: string
  label: string
  error?: string | undefined
}

export default function FormInput(props: Props) {
  const { name, label, ref, className, error = undefined, ...rest } = props
  return (
    <Field
      name={name}
      className='flex flex-col space-y-2 text-sm text-secondary-dark dark:text-secondary-light'
    >
      <Label className='font-bold'>{label}</Label>
      <Control
        ref={ref}
        {...rest}
        className={`rounded-md border bg-inherit p-1 dark:border-slate-100 ${className}`}
      />
      <Message
        className='text-xs font-semibold text-red-500'
        match='valueMissing'
      >
        {label + ' is required'}
      </Message>
      <Message match='typeMismatch' forceMatch={!!error}>
        {error}
      </Message>
    </Field>
  )
}
