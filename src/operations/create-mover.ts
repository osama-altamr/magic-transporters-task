import { createMoverSchema, type CreateMoverInput } from '@app/api/validations'
import { magicMoverRepository } from '@app/database/repositories/magic-mover-repository'
import { mapMover } from '@app/api/serializers'
import { InvalidRequestError } from '@app/utils/app-error'
import { QuestState } from '@app/utils/enums'

export interface CreateMoverOperationInput {
  weightLimit: number
  questState?: QuestState
}

/** Validates input, inserts mover, returns serialized output with currentItems. */
export const createMover = async (input: CreateMoverOperationInput) => {
  const result = createMoverSchema.safeParse(input)
  if (!result.success) {
    const error = new InvalidRequestError('Invalid mover data').setErrors(result.error.issues)
    throw error
  }

  const mover = await magicMoverRepository.insert(result.data)
  const moverWithItems = await magicMoverRepository.findbyIdWithCurrentItems(mover.id)
  if (!moverWithItems) throw new Error('Mover not found after create')
  return mapMover(moverWithItems)
}
