import connection from '../db/connection'
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

import { Coinmarketcap } from '../helpers/Coinmarketcap.service'

interface SelectGlobal extends RowDataPacket {
  id: number
  market_cap: number
  volume_24h: number
  bitcoin_dominance: number
  cryptocurrency_count: number
  last_updated: string
}
interface RSH extends ResultSetHeader {
  affectedRows: number
  lastInsertId: number
}

export class Global {
  /**
   * provides row with latest data of 'globals' table
   */
  static async latest(): Promise<SelectGlobal | void> {
    try {
      const res = await connection.query<SelectGlobal[]>(`SELECT * FROM globals ORDER BY id DESC LIMIT 1`)
      return res[0][0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * provides all rows of 'globals' table
   */
  static async all(): Promise<SelectGlobal[] | void> {
    try {
      const res = await connection.query<SelectGlobal[]>(`SELECT * FROM globals`)
      return res[0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * adds new row to 'globals' table
   */
  static async insert(): Promise<[RSH, FieldPacket[]] | void> {
    const CMC = new Coinmarketcap()
    const api = await CMC.getGlobals()

    try {
      const res = connection.query<RSH>(
        `INSERT INTO globals (market_cap, volume_24h, bitcoin_dominance, cryptocurrency_count) 
      VALUES (?, ?, ?, ?)`,
        [api.totalMC, api.volume24h, api.btcDominance, api.activeCryptocurrencies]
      )
      return res
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }
}
