import type { Request, Response } from 'express'
import { createItem } from '@app/operations/create-item'

export const addItem = async (req: Request, res: Response): Promise<void> => {
  const item = await createItem(req.body)
  res.status(201).json(item)
}
