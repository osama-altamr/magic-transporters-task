/**
 * Mission lifecycle: load (resting→loading) → start (loading→on-mission) → end (on-mission→resting).
 * Each transition logs to MissionLog; weight limit enforced at load.
 */
import { QuestState, ActivityType } from '@app/utils/enums'
import { magicMoverRepository } from '@app/database/repositories/magic-mover-repository'
import { magicItemRepository } from '@app/database/repositories/magic-item-repository'
import { missionLogRepository } from '@app/database/repositories/mission-log-repository'
import { BadRequestError } from '@app/utils/app-error'

export interface LoadMoverServiceInput {
  moverId: string
  itemIds: string[]
}

export const loadMoverItems = async (input: LoadMoverServiceInput) => {
  const mover = await magicMoverRepository.findById(input.moverId)
  if (!mover) {
    throw new BadRequestError('Mover not found')
  }
  if (mover.questState !== QuestState.resting) {
    throw new BadRequestError('Mover must be in resting state to load items')
  }

  const items = await magicItemRepository.findByIds(input.itemIds)
  if (items.length !== input.itemIds.length) {
    throw new BadRequestError('One or more items not found')
  }

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  if (totalWeight > mover.weightLimit) {
    throw new BadRequestError(
      `Total weight ${totalWeight} exceeds mover limit ${mover.weightLimit}`
    )
  }

  const previousState = mover.questState
  const newItemIds = [...(mover.currentItemIds ?? []), ...input.itemIds]

  await magicMoverRepository.patchById(input.moverId, {
    currentItemIds: newItemIds,
    questState: QuestState.loading,
  })

  const log = await missionLogRepository.insert({
    moverId: input.moverId,
    activityType: ActivityType.load,
    itemIds: input.itemIds,
    details: {
      totalWeight,
      previousState,
    },
  })

  return { mover: await magicMoverRepository.findbyIdWithCurrentItems(input.moverId), log }
}

export const startMission = async (moverId: string) => {
  const mover = await magicMoverRepository.findById(moverId)
  if (!mover) {
    throw new BadRequestError('Mover not found')
  }
  if (mover.questState !== QuestState.loading) {
    throw new BadRequestError('Mover must be in loading state to start mission')
  }

  const previousState = mover.questState

  await magicMoverRepository.patchById(moverId, {
    questState: QuestState.onMission,
  })

  const log = await missionLogRepository.insert({
    moverId,
    activityType: ActivityType.start,
    itemIds: mover.currentItemIds ?? [],
    details: { previousState },
  })

  return { mover: await magicMoverRepository.findbyIdWithCurrentItems(moverId), log }
}

export const endMission = async (moverId: string) => {
  const mover = await magicMoverRepository.findById(moverId)
  if (!mover) {
    throw new BadRequestError('Mover not found')
  }

  const previousState = mover.questState
  const itemIds = mover.currentItemIds ?? []

  await magicMoverRepository.patchById(moverId, {
    questState: QuestState.resting,
    currentItemIds: [],
  })

  const log = await missionLogRepository.insert({
    moverId,
    activityType: ActivityType.end,
    itemIds,
    details: { previousState },
  })

  return { mover: await magicMoverRepository.findById(moverId), log }
}
