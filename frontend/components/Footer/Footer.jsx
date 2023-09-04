import React from 'react'
import styled from 'styled-components'

import { COLORS, WEIGHT } from '@/utils/theme'
import { InlineFlex } from '@/components/Flex/Flex'

const Footer = () => {
  return (
    <>
      <FooterWrapperFlex justify='space-between' align='center'>
        <TransitionImg src='./images/transition-block.svg'></TransitionImg>

        <Logo>Crypto app</Logo>
        <span>created by Stanislav Řihák</span>
      </FooterWrapperFlex>
    </>
  )
}

export default Footer

const FooterWrapperFlex = styled(InlineFlex)`
  position: relative;
  width: 100%;
  padding: 12rem 6rem 4rem 6rem;
  background-color: ${COLORS.light_purple};

  @media only screen and (max-width: 1000px) {
    padding: 12rem 2rem 4rem 2rem;
  }
`
const TransitionImg = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform: rotate(180deg);
`
const Logo = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
`
