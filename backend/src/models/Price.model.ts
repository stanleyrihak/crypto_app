import connection from '../db/connection'
import { Coinmarketcap } from '../helpers/Coinmarketcap.service'
import { RowDataPacket } from 'mysql2'

interface SelectPrice extends RowDataPacket {
  id: number
  coin_id: number
  price: number
  change_1h: number
  change_24h: number
  change_7d: number
  change_30d: number
  change_60d: number
  change_90d: number
  market_cap: number
  last_updated: string
}

interface SelectDate extends RowDataPacket {
  last_updated: string
}

export class Price {
  /**
   * provides latest date of update in 'coins_prices' table
   */
  static async getLatestDate(): Promise<string | null> {
    const res = await connection.query<SelectDate[]>(
      'SELECT last_updated FROM coins_prices ORDER BY last_updated DESC LIMIT 1'
    )
    if (res[0].length) {
      return res[0][0].last_updated
    }
    return null
  }

  /**
   * provides all rows of 'coins_prices' table
   */
  static async all(): Promise<SelectPrice[] | undefined> {
    try {
      const res = await connection.query<SelectPrice[]>('SELECT * FROM coins_prices ORDER BY last_updated DESC')
      return res[0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * provides all rows of 'coins_prices' table about specified coin
   */
  static async history(coinId: number): Promise<SelectPrice[] | void> {
    try {
      const res = await connection.query<SelectPrice[]>(
        'SELECT * FROM coins_prices WHERE coin_id = ? ORDER BY last_updated ASC',
        [coinId]
      )
      return res[0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * adds new rows for all coins with the latest prices in 'coins_prices' table
   */
  static async insert() {
    try {
      const CMC = new Coinmarketcap()
      const coins = await CMC.getCoins()
      const neededValues = coins.map((coin) => [
        coin.id,
        coin.price,
        coin.change1h,
        coin.change24h,
        coin.change7d,
        coin.change30d,
        coin.change60d,
        coin.change90d,
        coin.marketCap,
      ])

      const db = await connection.query(
        `INSERT INTO coins_prices 
        (coin_id, price, change_1h, change_24h, change_7d, change_30d, change_60d, change_90d, market_cap) 
        VALUES ?`,
        [neededValues]
      )
      return db
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }
}
