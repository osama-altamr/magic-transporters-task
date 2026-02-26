import { magicMoverRepository } from '@app/database/repositories/magic-mover-repository'
import { leaderboardQuerySchema } from '@app/api/validations/leaderboard.validation'
import { InvalidRequestError } from '@app/utils/app-error'
import { mapMover, type MoverOutput } from '@app/api/serializers'

export interface MoverLeaderboardEntry {
  mover: MoverOutput
  completedMissions: number
}

export interface LeaderboardResponse {
  items: MoverLeaderboardEntry[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const getMoversLeaderboard = async (
  query: Record<string, unknown>
) => {
  const result = leaderboardQuerySchema.safeParse(query)
  if (!result.success) {
    throw new InvalidRequestError('Invalid pagination params').setErrors(
      result.error.issues
    )
  }

  const data = await magicMoverRepository.getLeaderboardPaginated(
    result.data.page,
    result.data.limit
  )

  return {
    ...data,
    items: data.items,
  }
}
