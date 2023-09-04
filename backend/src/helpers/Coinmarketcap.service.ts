import CoinMarketCap from 'coinmarketcap-api'
import { Tickers, Global, Metadata, Coin, Globals, SingleCoin } from 'coinmarketcap-api'

export class Coinmarketcap {
  client: CoinMarketCap
  constructor() {
    const apiKey = process.env.COINMARKETCAP_API_KEY as string
    this.client = new CoinMarketCap(apiKey)
  }

  async getCoins(): Promise<Coin[]> {
    const api = await this.client.getTickers()
    const data = api.data
    const coins = data.map((coin: Tickers) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      dateAdded: coin.date_added,
      cmcRank: coin.cmc_rank,
      price: coin.quote.USD.price,
      change1h: coin.quote.USD.percent_change_1h,
      change24h: coin.quote.USD.percent_change_24h,
      change7d: coin.quote.USD.percent_change_7d,
      change30d: coin.quote.USD.percent_change_30d,
      change60d: coin.quote.USD.percent_change_60d,
      change90d: coin.quote.USD.percent_change_90d,
      marketCap: coin.quote.USD.market_cap,
      lastUpdated: coin.quote.USD.last_updated,
    }))

    return coins
  }

  async getGlobals(): Promise<Globals> {
    const api = await this.client.getGlobal()
    const data = api.data as unknown as Global
    const pickedData = {
      activeCryptocurrencies: data.active_cryptocurrencies,
      btcDominance: data.btc_dominance,
      totalMC: data.quote.USD.total_market_cap,
      volume24h: data.quote.USD.total_volume_24h,
      lastUpdated: data.quote.USD.last_updated,
    }

    return pickedData
  }

  async getSingleCoin(id: number): Promise<SingleCoin> {
    const api = await this.client.getMetadata({ id: id })
    console.log(api)
    const data = api.data[id] as Metadata
    const pickedData = {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      description: data.description,
      logoUrl: data.logo,
      website: Array.isArray(data.urls.website) ? data.urls.website[0] : data.urls.website,
      dateLaunched: data.date_launched,
    }
    return pickedData
  }

  async getMany(ids: number[]): Promise<SingleCoin[]> {
    const api = await this.client.getMetadata({ id: ids.join(',') })
    const data = api.data as Metadata[]
    return Object.values(data).map((data) => ({
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      description: data.description,
      logoUrl: data.logo,
      website: Array.isArray(data.urls.website) ? data.urls.website[0] : data.urls.website,
      dateLaunched: data.date_launched,
    }))
  }
}
