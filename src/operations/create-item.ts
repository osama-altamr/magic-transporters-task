import { createItemSchema } from '@app/api/validations'
import { magicItemRepository } from '@app/database/repositories/magic-item-repository'
import { mapItem } from '@app/api/serializers'
import { InvalidRequestError } from '@app/utils/app-error'

export interface CreateItemOperationInput {
  name: string
  weight: number
}

export const createItem = async (input: CreateItemOperationInput) => {
  const result = createItemSchema.safeParse(input)
  if (!result.success) {
    const error = new InvalidRequestError('Invalid item data').setErrors(result.error.issues)
    throw error
  }

  const item = await magicItemRepository.insert(result.data)
  return mapItem(item)
}
