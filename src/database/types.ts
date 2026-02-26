import type { Document } from 'mongoose'

export interface MongooseDocument extends Document {
  deletedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}
