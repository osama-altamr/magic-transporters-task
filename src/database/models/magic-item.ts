import { Schema, model } from 'mongoose'
import type { MongooseDocument } from '@app/database/types'

/** Item entity: name and weight. Loaded onto movers and referenced in MissionLog. */
export interface IMagicItem extends MongooseDocument {
  id: string
  name: string
  weight: number
}

const magicItemSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true },
    collection: 'MagicItem',
 }
)

magicItemSchema.index({ deletedAt: 1 })

export const MagicItemModel = model<IMagicItem>('MagicItem', magicItemSchema)
