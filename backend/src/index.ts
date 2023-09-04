import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import DevRouter from './routes/dev.route'
import coinsRouter from './routes/coins.route'
import globalsRouter from './routes/globals.route'

import { errorHandler } from './middlewares/error.middleware'
import { scheduledTasks } from './helpers/index.helpers'

const app: Express = express()
const PORT = 4000

// middleware
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(errorHandler)

// routes
app.use('/', DevRouter)
app.use('/coins', coinsRouter)
app.use('/globals', globalsRouter)

// cron (2PM)
scheduledTasks()

app.listen(PORT, () => {
  console.log(`RUNNIN on port -- ${PORT} --`)
})
