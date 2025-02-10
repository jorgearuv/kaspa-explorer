export interface TokenHolder {
  address: string
  amount: string
}

export interface TokenData {
  tick: string // ticker symbol
  max: string // maximum supply
  lim: string // limit per mint
  pre: string // pre-minted amount
  to: string // deployment address
  dec: string // decimals
  minted: string // total minted
  opScoreAdd: string // operation score add
  opScoreMod: string // operation score mod
  state: string // token state
  hashRev: string // hash revision
  mtsAdd: string // timestamp added
  holderTotal: string // total number of holders
  transferTotal: string // total number of transfers
  mintTotal: string // total number of mints
  holder: TokenHolder[] // list of holders
}
