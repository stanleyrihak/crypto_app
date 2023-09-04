import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { COLORS } from '@/utils/theme'
import { InlineFlex } from '@/components/Flex/Flex'

import MarketRow from '@/components/MarketRow/MarketRow'
import SectionHeading from '@/components/SectionHeading/SectionHeading'

const ROW_HEADERS = ['Cryptocurrency', 'Abbreviation', 'Price', '24h price change', '7d price change', '7d price chart']

const Market = () => {
  const [currentData, setCurrentData] = useState([])
  const [pagnationNumber, setPagnationNumber] = useState(1)
  const limit = 20

  const updateData = async (x, y) => {
    const db = await fetch(`http://localhost:4000/coins?page=${x}&limit=${y}`)
    const data = await db.json()
    setCurrentData(data)
  }

  useEffect(() => {
    updateData(0, limit)
  }, [])

  const handlePages = (x) => {
    switch (x) {
      case 1:
        updateData(0, limit)
        setPagnationNumber(1)
        console.log('1')
        break
      case 2:
        updateData(20, limit)
        setPagnationNumber(2)
        console.log('2')
        break
      case 3:
        updateData(40, limit)
        setPagnationNumber(3)
        console.log('3')
        break
      case 4:
        updateData(60, limit)
        setPagnationNumber(4)
        console.log('4')
        break
      case 5:
        updateData(80, limit)
        setPagnationNumber(5)
        console.log('5')
    }
  }

  return (
    <ChartSection id='market'>
      <SectionHeading>Live market</SectionHeading>
      <Description>
        Here you can view current prices of the main 100 cryptocurrencies / tokens. Bear in mind that these prices are
        not exact.
      </Description>
      <InlineFlex justify='center'>
        <Chart>
          <thead>
            <tr>
              {ROW_HEADERS.map((header, i) => {
                if (i < 3) {
                  return <RowEl key={i}>{header}</RowEl>
                } else {
                  return <RowElResp key={i}>{header}</RowElResp>
                }
              })}
            </tr>
          </thead>
          <tbody>
            {currentData.map((coin, i) => {
              return <MarketRow key={i} values={coin} />
            })}
          </tbody>
        </Chart>
      </InlineFlex>
      <ButtonsWrapper gap={1}>
        <PageButton href={'#market'} scroll={false} $isActive={pagnationNumber === 1} onClick={() => handlePages(1)}>
          1
        </PageButton>
        <PageButton href={'#market'} scroll={false} $isActive={pagnationNumber === 2} onClick={() => handlePages(2)}>
          2
        </PageButton>
        <PageButton href={'#market'} scroll={false} $isActive={pagnationNumber === 3} onClick={() => handlePages(3)}>
          3
        </PageButton>
        <PageButton href={'#market'} scroll={false} $isActive={pagnationNumber === 4} onClick={() => handlePages(4)}>
          4
        </PageButton>
        <PageButton href={'#market'} scroll={false} $isActive={pagnationNumber === 5} onClick={() => handlePages(5)}>
          5
        </PageButton>
      </ButtonsWrapper>
    </ChartSection>
  )
}

export default Market

const ChartSection = styled.div`
  position: relative;
  padding: 6rem;
  background-color: ${COLORS.very_dark_purple};

  @media only screen and (max-width: 1000px) {
    padding: 2rem;
  }
`
const Description = styled.p`
  color: ${COLORS.white};
  margin: 1rem 0 3rem 0;
`
const Chart = styled.table`
  position: relative;
  width: 100%;
  border-radius: 2rem;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    vertical-align: center;
    text-align: left;
    padding: 2rem 0 2rem;
  }
  th {
    border-bottom: 2px solid #3c3140;
  }
  td {
    border-top: 2px solid #3c3140;
  }
`
const RowEl = styled.th`
  color: rgb(147, 147, 159);
  font-weight: 800;
`
const RowElResp = styled(RowEl)`
  @media only screen and (max-width: 1150px) {
    display: none;
  }
`
const ButtonsWrapper = styled(InlineFlex)`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`
const PageButton = styled(Link)`
  font-family: 'Chaney';
  font-weight: bold;
  font-size: 1rem;
  color: ${({ $isActive }) => ($isActive ? COLORS.very_dark_purple : COLORS.light_purple)};

  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ $isActive }) => ($isActive ? COLORS.light_purple : COLORS.very_dark_purple)};
`
