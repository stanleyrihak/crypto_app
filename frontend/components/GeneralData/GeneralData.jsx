import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { COLORS } from '@/utils/theme'
import { ColumnFlex } from '@/components/Flex/Flex'

import GeneralDataInstance from '../GeneralDataInstance/GeneralDataInstance'
import SectionHeading from '@/components/SectionHeading/SectionHeading'

const GeneralData = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false)
  const countUpRef = useRef(null)

  // scroll check
  useEffect(() => {
    const callbackFunc = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      })
    }

    const setup = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver(callbackFunc, setup)

    if (countUpRef.current) {
      observer.observe(countUpRef.current)
    }

    return () => {
      if (countUpRef.current) {
        observer.unobserve(countUpRef.current)
      }
    }
  }, [])

  const DataObjects = [
    {
      value: data.market_cap,
      description: 'Total marketcap of all cryptocurrencies ($)',
    },
    { value: data.volume_24h, description: 'Total volume on markets during last 24h ($)' },
    { value: data.bitcoin_dominance, description: 'Bitcoin dominance (%)' },
    { value: data.cryptocurrency_count, description: 'Total number of relevant cryptocurrencies' },
  ]

  return (
    <GDSection ref={countUpRef}>
      <ColumnFlex>
        <SectionHeading>Interesting data</SectionHeading>
        <Description>
          Here are some of the most relevant general data about the market that should help to create a picture of
          current state of crypto.
        </Description>
        {isVisible && (
          <ColumnFlex justify='center' align='center' gap={4}>
            {DataObjects.map((el, i) => {
              return <GeneralDataInstance key={i} value={el.value} description={el.description} />
            })}
          </ColumnFlex>
        )}
      </ColumnFlex>
    </GDSection>
  )
}

export default GeneralData

const GDSection = styled.div`
  background-color: ${COLORS.very_dark_purple};
  padding: 6rem;

  @media only screen and (max-width: 1000px) {
    padding: 2rem;
  }
`
const Description = styled.p`
  color: ${COLORS.white};
  margin: 1rem 0 3rem 0;
`
