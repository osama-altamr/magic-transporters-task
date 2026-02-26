import { Router } from 'express'
import { addMover, leaderboard } from '@app/api/controllers/movers-controller'
import { asyncHandler } from '@app/utils/async-handler'

const router = Router()

router.get('/leaderboard', asyncHandler(leaderboard))
router.post('/', asyncHandler(addMover))

export default router
