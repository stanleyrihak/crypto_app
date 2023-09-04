import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { COLORS, WEIGHT } from '@/utils/theme'
import { InlineFlex, ColumnFlex } from '@/components/Flex/Flex'

import Navbar from '@/components/Navbar/Navbar'
import LineChart from '@/components/LineChart/LineChart'

const LOGO_CONTENT = 'Crypto app'

export default function Coin({ chartData, coinData }) {
  if (!chartData || !coinData) {
    return (
      <>
        <header>
          <Navbar logoContent={LOGO_CONTENT} />
        </header>
        <main>404</main>
      </>
    )
  }

  return (
    <>
      <header>
        <Navbar logoContent={LOGO_CONTENT} />
      </header>
      <main>
        <CoinWrapper>
          <ColumnFlex gap={1}>
            <InlineFlex gap={1} align='center'>
              {coinData.logo && <Logo src={coinData.logo} />}
              <BoldHeading>{coinData.name}</BoldHeading>
              <ThinHeading>{coinData.abbr}</ThinHeading>
            </InlineFlex>
            <Text>{coinData.description}</Text>
            {coinData.website && (
              <div>
                <CoinLink target='_blank' href={coinData.website}>
                  visit their website
                </CoinLink>
              </div>
            )}
          </ColumnFlex>
          <ChartWrapper>
            <LineChart chartData={chartData} />
          </ChartWrapper>
        </CoinWrapper>
      </main>
    </>
  )
}

const ChartWrapper = styled.div`
  width: 100%;
`

const BoldHeading = styled.span`
  font-family: 'Chaney';
  font-weight: thin;
  font-size: 3rem;
`
const ThinHeading = styled.a`
  font-family: 'Chaney';
  font-weight: bold;
  font-size: 2rem;
  color: ${COLORS.light_purple};

  display: inline-flex;
`
const Text = styled.span`
  font-family: 'Gilroy';
  font-weight: 300;
  font-size: 1rem;
`
const Logo = styled.img`
  height: 3rem;
`
const CoinLink = styled.a`
  font-family: 'Chaney';
  font-weight: thin;
  font-size: 1rem;
`
const CoinWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4rem;
  grid-gap: 3rem;
  > * {
    align-self: center;
    justify-self: center;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

export const getServerSideProps = async (context) => {
  const chartData = await fetch(`http://localhost:4000/graph/${context.query.id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))

  const coinData = await fetch(`http://localhost:4000/coins/${context.query.id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))

  if (!chartData || !coinData) {
    return {
      notFound: true,
    }
  }

  return {
    props: { chartData, coinData },
  }
}
