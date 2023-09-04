import React from 'react'
import styled from 'styled-components'

const LinkEffect = ({ children }) => {
  return <LinkEffectStyled>{children}</LinkEffectStyled>
}

export default LinkEffect

const LinkEffectStyled = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40%;
    width: 0;
    z-index: -1;

    background-color: #fee0ab;
    transition: 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
`
