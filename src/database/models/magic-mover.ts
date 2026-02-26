import { Schema, model } from 'mongoose'
import { QuestState } from '@app/utils/enums'
import type { MongooseDocument } from '@app/database/types'
import { IMagicItem } from './magic-item'

/** Mover entity: weight limit, quest state, loaded item refs. currentItems is populated via virtual. */
export interface IMagicMover extends MongooseDocument {
  id: string
  weightLimit: number
  questState: QuestState
  currentItemIds: string[]
  currentItems: IMagicItem[]
}

const magicMoverSchema = new Schema(
  {
    weightLimit: { type: Number, required: true },
    questState: {
      type: String,
      enum: Object.values(QuestState),
      default: QuestState.resting,
    },
    currentItemIds: { type: [{
      type: Schema.Types.ObjectId,
      ref: 'MagicItem',
    }], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true },
    collection: 'MagicMover',
 }
)

magicMoverSchema.virtual('currentItems', {
  ref: 'MagicItem',
  localField: 'currentItemIds',
  foreignField: '_id',
})

magicMoverSchema.index({ deletedAt: 1 })

export const MagicMoverModel = model<IMagicMover>('MagicMover', magicMoverSchema)
