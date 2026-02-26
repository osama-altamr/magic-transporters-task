import type { Request, Response } from 'express'
import { loadMoverItems } from '@app/operations/load-mover-items'
import { startMissionOperation } from '@app/operations/start-mission'
import { endMissionOperation } from '@app/operations/end-mission'

export const loadItems = async (req: Request, res: Response): Promise<void> => {
  const mover = await loadMoverItems(req.body)
  res.status(200).json(mover)
}

export const startMission = async (req: Request, res: Response): Promise<void> => {
  const { moverId } = req.params
  const mover = await startMissionOperation(moverId)
  res.status(200).json(mover)
}

export const endMission = async (req: Request, res: Response): Promise<void> => {
  const { moverId } = req.params
  const mover = await endMissionOperation(moverId)
  res.status(200).json(mover)
}
