import express, { Request, Response } from 'express'
const router = express.Router()

import { Price } from '../models/Price.model'

router.get('/graph/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const db = await Price.history(id)

  res.status(200).json(db)
})

export default router
