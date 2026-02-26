import { z } from 'zod'

const mongoIdRegex = /^[a-fA-F0-9]{24}$/

export const loadMoverSchema = z.object({
  moverId: z.string().min(1, 'Mover ID is required'),
  itemIds: z
    .array(z.string().regex(mongoIdRegex, 'Invalid MongoDB ID'))
    .min(1, 'At least one item is required'),
})

export type LoadMoverInput = z.infer<typeof loadMoverSchema>
