import { Router } from 'express'
import {
  loadItems,
  startMission,
  endMission,
} from '@app/api/controllers/missions-controller'
import { asyncHandler } from '@app/utils/async-handler'

const router = Router()

router.post('/', asyncHandler(loadItems))
router.patch('/:moverId/start', asyncHandler(startMission))
router.patch('/:moverId/end', asyncHandler(endMission))

export default router
