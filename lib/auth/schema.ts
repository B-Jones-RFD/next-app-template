import { z } from 'zod'

export const CredentialsSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
    .regex(/[0-9]/, { message: 'Contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character',
    })
    .trim(),
})
