import { BaseRepository } from '@app/database/repositories/base'
import { MissionLogModel } from '@app/database/models'
import type { IMissionLog } from '@app/database/models'

export class MissionLogRepository extends BaseRepository<IMissionLog> {
  constructor() {
    super(MissionLogModel)
  }
}

export const missionLogRepository = new MissionLogRepository()
