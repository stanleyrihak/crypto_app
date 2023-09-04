import connection from '../db/connection'
import moment from 'moment'
import { convertAPIDate } from '../helpers/index.helpers'
import { Coinmarketcap } from '../helpers/Coinmarketcap.service'
import { RowDataPacket } from 'mysql2'

interface Extra extends RowDataPacket {
  coin_id: number
  name: string
  abbr: string
  cmc_rank: number
  description: string
  logo: string
  website: string
  launch_date: string
}

export class Coin {
  /**
   * provides all rows of 'coins' table
   */
  static async allNames(): Promise<object> {
    try {
      const res = await connection.query(`SELECT * FROM coins`)
      return res[0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * provides all rows of 'coins' + 'coins_prices' joined table
   */
  static async all(page: number, limit: number): Promise<object> {
    try {
      const res = await connection.query(
        `SELECT b.coin_id, b.name, b.abbr, a.price, a.change_24h, a.change_7d, a.last_updated 
      FROM coins_prices a, coins b 
      WHERE a.last_updated = (SELECT max(last_updated) FROM coins_prices) 
      AND a.coin_id = b.coin_id 
      ORDER BY b.cmc_rank ASC LIMIT ? OFFSET ?`,
        [limit, page]
      )
      return res[0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * provides all rows of 'coins' table with the specified IDs
   */
  static async findNames(...ids: number[]): Promise<object> {
    const placeholders = ids.map(() => '?').join(', ')
    const query = `SELECT * FROM coins WHERE coin_id IN (${placeholders})`

    try {
      const res = await connection.query(query, ids)
      return res[0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * updates all rows of 'coins' table
   */
  static async updateNames(): Promise<object | void> {
    const CMC = new Coinmarketcap()
    const api = await CMC.getCoins()

    try {
      const updateDB = api.map(async (coin) => {
        await connection.query(
          `UPDATE coins
           SET name = ?, abbr = ?, cmc_rank = ?
           WHERE coin_id = ?`,
          [coin.name, coin.symbol, coin.cmcRank, coin.id]
        )
      })
      await Promise.all(updateDB)
      console.log('Update completed successfully')
    } catch (error) {
      console.error('Error updating coins:', error)
      throw error
    }
  }

  /**
   * provides additional information about specified coin
   */
  static async findExtra(id: number): Promise<Extra | void> {
    try {
      const res = await connection.query<Extra[]>(
        `SELECT ca.coin_id, c.name, c.abbr, c.cmc_rank, ca.description, ca.logo, ca.website, ca.launch_date 
        FROM coins_additional ca, coins c 
        WHERE ca.coin_id = ? AND ca.coin_id = c.coin_id`,
        [id]
      )
      return res[0][0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * inserts row(s) with additional information about specified coin(s)
   */
  static async insertExtra(ids: number[]) {
    try {
      const CMC = new Coinmarketcap()
      const coins = await CMC.getMany(ids)

      const db = coins.map(async (coin) => {
        await connection.query(
          `INSERT INTO coins_additional (coin_id, description, logo, website, launch_date) VALUES (?, ?, ?, ?, ?)`,
          [coin.id, coin.description, coin.logoUrl, coin.website, convertAPIDate(coin.dateLaunched)]
        )
      })
      await Promise.all(db)
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  /**
   * provides all rows of 'coins' + 'coins_prices' joined table specified by IDs
   */
  static async findAll(...ids: number[]): Promise<object> {
    const placeholders = ids.map(() => '?').join(', ')
    const query = `SELECT b.coin_id, b.name, b.abbr, a.price, a.change_24h, a.change_7d, a.last_updated 
      FROM coins_prices a, coins b 
      WHERE a.last_updated = (SELECT max(last_updated) FROM coins_prices) 
      AND a.coin_id = b.coin_id
      AND a.coin_id IN (${placeholders})
      ORDER BY b.cmc_rank ASC`

    try {
      const res = await connection.query(query, ids)
      return res[0]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }
}
