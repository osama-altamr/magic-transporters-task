import { Router } from 'express'
import { addItem } from '@app/api/controllers/items-controller'
import { asyncHandler } from '@app/utils/async-handler'

const router = Router()

router.post('/', asyncHandler(addItem))

export default router
