import { z } from 'zod'

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  weight: z.number().positive('Weight must be positive'),
})

export type CreateItemInput = z.infer<typeof createItemSchema>
