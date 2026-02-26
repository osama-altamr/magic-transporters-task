import { z } from 'zod'
import { QuestState } from '@app/utils/enums'
import type { IMagicMover } from '@app/database/models'
import { itemOutputSchema } from './item.serializer'
import { objectId } from './common'

export const moverOutputSchema = z.object({
  id: objectId,
  weightLimit: z.number(),
  questState: z.nativeEnum(QuestState),
  currentItemIds: z.array(objectId),
  currentItems: z.array(itemOutputSchema).nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MoverOutput = z.infer<typeof moverOutputSchema>

export const mapMover = (doc: IMagicMover & { createdAt?: Date; updatedAt?: Date }): MoverOutput => {
  const output = {
    id: doc.id,
    weightLimit: doc.weightLimit,
    questState: doc.questState as QuestState,
    currentItemIds: doc.currentItemIds ?? [],
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    currentItems: doc.currentItems,
  }
  return moverOutputSchema.parse(output)
}
