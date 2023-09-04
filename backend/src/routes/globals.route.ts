import express, { Request, Response } from 'express'
const router = express.Router()

import { Global } from '../models/Global.model'

router.get('/', async (req: Request, res: Response) => {
  const db = await Global.latest()

  res.status(200).json(db)
})

router.get('/all', async (req: Request, res: Response) => {
  const db = await Global.all()

  res.status(200).json(db)
})

router.post('/update', async (req: Request, res: Response) => {
  const db = await Global.insert()

  res.status(200).json(db)
})

export default router
