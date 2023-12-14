import express, { Request, Response } from 'express'
const router = express.Router()

import { Coinmarketcap } from '../helpers/Coinmarketcap.service'

import { Coin } from '../models/Coin.model'
import { Price } from '../models/Price.model'
import { Global } from '../models/Global.model'

router.get('/hi', async (req: Request, res: Response) => {
  /* const coinIds = [
    1, 2, 52, 74, 328, 512, 825, 1027, 1321, 1376, 1518, 1659, 1720, 1765, 1831,
    1839, 1958, 1966, 1975, 2010, 2011, 2087, 2280, 2299, 2416, 2563, 2586, 2634,
    2943, 3077, 3155, 3408, 3513, 3602, 3635, 3773, 3794, 3890, 3897, 3957, 4030,
    4066, 4157, 4172, 4195, 4256, 4558, 4642, 4687, 4846, 4847, 4943, 5426, 5632,
    5665, 5690, 5805, 5994, 6210, 6535, 6538, 6636, 6719, 6783, 6892, 6953, 7080,
    7083, 7186, 7226, 7278, 7334, 7501, 7653, 8000, 8646, 8916, 10603, 10791, 11092,
    11156, 11419, 11840, 11841, 12220, 16086, 18876, 19891, 20314, 20396, 20947,
    21794, 22861, 23095, 23149, 24478, 25028, 26081, 27075, 28298
  ];

  const db = Coin.insertExtra(coinIds)
  res.status(200).json(db) */

  const db = Global.insert()
  
  res.status(200).json(db)
})

router.get('/graph/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const db = await Price.history(id)

  res.status(200).json(db)
})

export default router
