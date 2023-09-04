import React from 'react'
import styled from 'styled-components'
import { COLORS, SIZE } from '@/utils/theme'

const SectionHeading = ({ children }) => {
  return <SectionHeadingStyled>{children}</SectionHeadingStyled>
}

export default SectionHeading

const SectionHeadingStyled = styled.h2`
  font-family: 'Gilroy';
  font-weight: 800;
  font-size: 3rem;
  color: ${COLORS.white};

  @media only screen and (max-width: 1000px) {
    font-size: 2rem;
  }
  /* padding: 6rem 0 0 6rem; */
`
