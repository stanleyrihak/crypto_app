import React from 'react'
import styled from 'styled-components'
import CountUp from 'react-countup'

import { COLORS, SIZE } from '@/utils/theme'
import { ColumnFlex } from '@/components/Flex/Flex'

const GeneralDataInstance = ({ value, description }) => {
  return (
    <ColumnFlex align='center' gap={1}>
      <Value end={value} duration={3} separator=',' decimal='.' prefix='' />
      <Description>{description}</Description>
    </ColumnFlex>
  )
}

export default GeneralDataInstance

const Value = styled(CountUp)`
  font-family: 'Chaney';
  font-weight: bold;
  font-size: 4rem;
  color: ${COLORS.white};

  @media only screen and (max-width: 1000px) {
    font-size: 3rem;
  }
  @media only screen and (max-width: 800px) {
    font-size: 2rem;
  }
`
const Description = styled.span`
  font-family: 'Chaney';
  font-weight: thin;
  font-size: 1rem;
  color: ${COLORS.light_purple};

  text-transform: uppercase;
  white-space: nowrap;

  @media only screen and (max-width: 800px) {
    font-size: 0.75rem;
  }
`
