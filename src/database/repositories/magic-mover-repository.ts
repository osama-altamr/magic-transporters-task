import { BaseRepository } from '@app/database/repositories/base'
import { MagicMoverModel } from '@app/database/models'
import type { IMagicMover } from '@app/database/models'
import mongoose from 'mongoose'
import { ActivityType } from '@app/utils/enums'

export interface MoverLeaderboardRow {
  mover: {
    id: string
    weightLimit: number
    questState: string
    currentItemIds: string[]
    createdAt: string
    updatedAt: string
  }
  completedMissions: number
}

export interface LeaderboardPaginatedResult {
  items: MoverLeaderboardRow[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export class MagicMoverRepository extends BaseRepository<IMagicMover> {
  constructor() {
    super(MagicMoverModel)
  }

  findbyIdWithCurrentItems(id: string): Promise<IMagicMover | null> {
    return this.model.findById(id).populate(this.popOptions).where({ deletedAt: null })
  }

  async getLeaderboardPaginated(
    page: number,
    limit: number
  ): Promise<LeaderboardPaginatedResult> {
    const skip = (page - 1) * limit
    const [result] = await this.model.aggregate<{
      total: { value: number }[]
      items: MoverLeaderboardRow[]
    }>([
      { $match: { deletedAt: null } },
      {
        $lookup: {
          from: 'MissionLog',
          let: { moverId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$moverId', '$$moverId'] },
                activityType: ActivityType.end,
                deletedAt: null,
              },
            },
          ],
          as: 'completedMissionsList',
        },
      },
      { $addFields: { completedMissions: { $size: '$completedMissionsList' } } },
      { $match: { completedMissions: { $gt: 0 } } },
      { $sort: { completedMissions: -1 } },
      {
        $facet: {
          total: [{ $count: 'value' }],
          items: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                mover: {
                  id: { $toString: '$_id' },
                  weightLimit: '$weightLimit',
                  questState: '$questState',
                  currentItemIds: { $ifNull: ['$currentItemIds', []] },
                  createdAt: {
                    $dateToString: {
                      date: '$createdAt',
                      format: '%Y-%m-%dT%H:%M:%S.000Z',
                    },
                  },
                  updatedAt: {
                    $dateToString: {
                      date: '$updatedAt',
                      format: '%Y-%m-%dT%H:%M:%S.000Z',
                    },
                  },
                },
                completedMissions: 1,
              },
            },
          ],
        },
      },
    ])

    const total = result?.total?.[0]?.value ?? 0
    const items = result?.items ?? []

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 0,
    }
  }

  popOptions: mongoose.PopulateOptions[] = [
    {
      path: 'currentItems',
    },
  ]
}

export const magicMoverRepository = new MagicMoverRepository()
