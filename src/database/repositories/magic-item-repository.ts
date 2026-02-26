import { BaseRepository } from '@app/database/repositories/base'
import { MagicItemModel } from '@app/database/models'
import type { IMagicItem } from '@app/database/models'

export class MagicItemRepository extends BaseRepository<IMagicItem> {
  constructor() {
    super(MagicItemModel)
  }
}

export const magicItemRepository = new MagicItemRepository()
