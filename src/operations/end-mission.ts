import { endMission } from '@app/api/services/internal/mission.service'
import { mapMover } from '@app/api/serializers'

export const endMissionOperation = async (moverId: string) => {
  const { mover } = await endMission(moverId)
  if (!mover) throw new Error('Mover not found after end')
  return mapMover(mover)
}
