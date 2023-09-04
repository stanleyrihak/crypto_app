import express, { Request, Response, application } from 'express'
const router = express.Router()

import { Coin } from '../models/Coin.model'
import { Price } from '../models/Price.model'
import {} from '../helpers/index.helpers'

router.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 0
  const limit = Number(req.query.limit) || 100
  const db = await Coin.all(page, limit)

  res.status(200).json(db)
})

router.post('/update', async (req: Request, res: Response) => {
  const db = await Price.insert()

  res.status(200).json(db)
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const db = await Coin.findExtra(id)

  res.status(200).json(db)
})

export default router
