import { loadMoverSchema } from '@app/api/validations'
import { loadMoverItems as loadMoverItemsService } from '@app/api/services/internal/mission.service'
import { mapMover } from '@app/api/serializers'
import { InvalidRequestError } from '@app/utils/app-error'

export interface LoadMoverItemsOperationInput {
  moverId: string
  itemIds: string[]
}

/** Validates, loads items onto mover (resting only), returns serialized mover. */
export const loadMoverItems = async (input: LoadMoverItemsOperationInput) => {
  const result = loadMoverSchema.safeParse(input)
  if (!result.success) {
    const error = new InvalidRequestError('Invalid load data').setErrors(result.error.issues)
    throw error
  }

  const { mover } = await loadMoverItemsService(result.data)
  if (!mover) throw new Error('Mover not found after load')
  return mapMover(mover)
}
