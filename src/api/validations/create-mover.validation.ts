import { z } from 'zod'
import { QuestState } from '@app/utils/enums'

export const createMoverSchema = z.object({
  weightLimit: z.number().positive('Weight limit must be positive'),
  questState: z.nativeEnum(QuestState).optional().default(QuestState.resting),
})

export type CreateMoverInput = z.infer<typeof createMoverSchema>
  