import * as cron from 'node-cron'
import moment from 'moment'

import { Price } from '../models/Price.model'
import { Global } from '../models/Global.model'

export const scheduledTasks = (): void => {
  const scheduledJobFunction = cron.schedule('0 14 * * *', async () => {
    await Price.insert()
    await Global.insert()

    const time = new Date()
    console.log(`DB updated at on ${time.toLocaleDateString()} at ${time.toLocaleTimeString()}!`)
  })

  scheduledJobFunction.start()
}

export const convertAPIDate = (apiDate: string) => {
  if (!apiDate) {
    return null
  }
  const formattedDate = moment(apiDate).format('YYYY-MM-DD HH:mm:ss')
  return formattedDate
}
