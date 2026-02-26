import type { Request, Response } from 'express'
import { createMover } from '@app/operations/create-mover'
import { getMoversLeaderboard } from '@app/operations/get-movers-leaderboard'

export const addMover = async (req: Request, res: Response): Promise<void> => {
  const mover = await createMover(req.body)
  res.status(201).json(mover)
}

export const leaderboard = async (req: Request, res: Response): Promise<void> => {
  const data = await getMoversLeaderboard(req.query)
  res.status(200).json(data)
}
