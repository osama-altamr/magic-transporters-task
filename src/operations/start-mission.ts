import { startMission } from '@app/api/services/internal/mission.service'
import { mapMover } from '@app/api/serializers'

export const startMissionOperation = async (moverId: string) => {
  const { mover } = await startMission(moverId)
  if (!mover) throw new Error('Mover not found after start')
  return mapMover(mover)
}
