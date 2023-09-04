declare module 'coinmarketcap-api' {
  class CoinMarketCap {
    constructor(apiKey: string)
    async getTickers(): Promise<{ data: Tickers[] }>
    async getGlobal(): Promise<{ data: Global[] }>
    async getMetadata({ id: number }): Promise<{ data: Metadata[] }>
  }

  /// getTickers ///
  type Prices = {
    price: number
    percent_change_1h: number
    percent_change_24h: number
    percent_change_7d: number
    percent_change_30d: number
    percent_change_60d: number
    percent_change_90d: number
    market_cap: number
    last_updated: string
  }
  export type Tickers = {
    id: number
    name: string
    symbol: string
    date_added: string
    cmc_rank: number
    quote: { USD: Prices }
  }

  /// getGlobal ///
  export type Global = {
    active_cryptocurrencies: number
    btc_dominance: number
    quote: {
      USD: {
        total_market_cap: number
        total_volume_24h: number
        last_updated: string
      }
    }
  }

  /// getMetadata ///
  export type Metadata = {
    id: number
    name: string
    symbol: string
    description: string
    logo: string
    urls: { website: string }
    date_launched: string
  }

  /// getCoins ///
  export type Coin = {
    id: number
    name: string
    symbol: string
    dateAdded: string
    cmcRank: number
    price: number
    change1h: number
    change24h: number
    change7d: number
    change30d: number
    change60d: number
    change90d: number
    marketCap: number
    lastUpdated: string
  }

  /// getGlobals ///
  export type Globals = {
    activeCryptocurrencies: number
    btcDominance: number
    totalMC: number
    volume24h: number
    lastUpdated: string
  }

  /// getSingleCoin ///
  export type SingleCoin = {
    id: number
    name: string
    symbol: string
    description: string
    logoUrl: string
    website: string
    dateLaunched: string
  }

  export default CoinMarketCap
}
