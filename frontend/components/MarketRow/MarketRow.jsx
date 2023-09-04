import React from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'

const MarketRow = ({ values }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/coin/${id}`)
  }

  const f = new Intl.NumberFormat('en', {
    currency: 'USD',
    style: 'currency',
  })

  const { coin_id: id, name, abbr } = values
  const price = f.format(values.price)
  const priceChangeDay = values.change_24h.toFixed(4)
  const priceChangeWeek = values.change_7d.toFixed(4)
  const cursorStyle = { cursor: `url('https://s2.coinmarketcap.com/static/img/coins/32x32/${id}.png'), auto` }

  return (
    <tr style={cursorStyle} onClick={() => handleClick()}>
      <RowCell>{name}</RowCell>
      <RowCell style={cursorStyle}>{abbr}</RowCell>
      <RowCell>{price}</RowCell>
      <RowCellResp>{priceChangeDay}%</RowCellResp>
      <RowCellResp>{priceChangeWeek}%</RowCellResp>
      <RowCellResp>
        <RowCellImg src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${id}.svg`} alt='' />
      </RowCellResp>
    </tr>
  )
}

export default MarketRow

const RowStyles = css`
  color: rgb(147, 147, 159);
`
const RowCell = styled.td`
  ${RowStyles}
`
const RowCellImg = styled.img`
  ${RowStyles}
`
const RowCellResp = styled(RowCell)`
  @media only screen and (max-width: 1150px) {
    display: none;
  }
`
