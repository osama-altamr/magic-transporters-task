import { z } from 'zod'
import type { IMagicItem } from '@app/database/models'
import { objectId } from './common'

export const itemOutputSchema = z.object({
  id: objectId,
  name: z.string(),
  weight: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ItemOutput = z.infer<typeof itemOutputSchema>

export const mapItem = (doc: IMagicItem & { createdAt?: Date; updatedAt?: Date }): ItemOutput => {
  const output = {
    id: doc.id,
    name: doc.name,
    weight: doc.weight,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
  return itemOutputSchema.parse(output)
}
