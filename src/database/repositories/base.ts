import type { FilterQuery, Model } from 'mongoose'
import type { MongooseDocument } from '@app/database/types'

/**
 * Base repository with soft-delete support. All reads filter by deletedAt: null.
 */
export class BaseRepository<T extends MongooseDocument> {
  model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  async insert(data: object): Promise<T> {
    return await this.model.create(data)
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().where({ deletedAt: null })
  }

  async findOneBy(query: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne({ ...query, deletedAt: null })
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).where({ deletedAt: null })
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return await this.model
      .find()
      .where({
        _id: { $in: ids },
        deletedAt: null,
      })
  }

  async findBy(query: FilterQuery<T>): Promise<T[]> {
    return await this.model.find({ ...query, deletedAt: null })
  }

  async patchById(id: string, data: object): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true })
  }

  async patchOneBy(query: object, data: object): Promise<T | null> {
    return await this.model.findOneAndUpdate(query, data, { new: true })
  }

  async updateMany(ids: string[], requestData: Partial<T>) {
    return await this.model.updateMany({ _id: { $in: ids } }, { $set: requestData })
  }

  async deleteManyByStoreId(storeId: string) {
    return await this.model.updateMany({ storeId }, { $set: { deletedAt: new Date() } })
  }

  async deleteManyByIds(ids: string[]) {
    return await this.model.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: new Date() } })
  }

  async deleteById(id: string): Promise<T | null> {
    return await this.patchById(id, { deletedAt: new Date() })
  }
}
