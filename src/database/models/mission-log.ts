import { Schema, model } from 'mongoose'
import { ActivityType } from '@app/utils/enums'
import type { MongooseDocument } from '@app/database/types'

/** Extra data for load/start/end logs (e.g. totalWeight at load, previousState). */
export interface IMissionLogDetails {
  totalWeight?: number
  previousState?: string
}

/** Audit log for mission lifecycle: load, start, end. Used for leaderboard count (end = completed). */
export interface IMissionLog extends MongooseDocument {
  id: string
  moverId: string
  activityType: ActivityType
  itemIds: string[]
  details?: IMissionLogDetails
}

const missionLogSchema = new Schema(
  {
    moverId: { type: Schema.Types.ObjectId, ref: 'MagicMover', required: true },
    activityType: {
      type: String,
      enum: Object.values(ActivityType),
      required: true,
    },
    itemIds: { type: [{
      type: Schema.Types.ObjectId,
      ref: 'MagicItem',
    }], default: [] },
    details: {
      totalWeight: Number,
      previousState: String,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true },
    collection: 'MissionLog',
 }
)

missionLogSchema.index({ deletedAt: 1 })

export const MissionLogModel = model<IMissionLog>('MissionLog', missionLogSchema)
