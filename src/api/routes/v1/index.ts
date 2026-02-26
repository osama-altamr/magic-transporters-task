import { Router } from 'express'
import moversRouter from './movers.router'
import itemsRouter from './items.router'
import missionsRouter from './missions.router'

const router = Router()

router.use('/movers', moversRouter)
router.use('/items', itemsRouter)
router.use('/missions', missionsRouter)

export default router
