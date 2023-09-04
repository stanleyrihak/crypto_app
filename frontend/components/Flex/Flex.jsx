import React from 'react'
import styled from 'styled-components'

export const ColumnFlex = ({ className, justify, align, gap, children }) => {
  return (
    <ColumnFlexStyled className={className} justify={justify} align={align} gap={gap}>
      {children}
    </ColumnFlexStyled>
  )
}
const ColumnFlexStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  gap: ${(props) => `${props.gap}rem`};
`

export const InlineFlex = ({ className, justify, align, gap, children }) => {
  return (
    <InlineFlexStyled className={className} justify={justify} align={align} gap={gap}>
      {children}
    </InlineFlexStyled>
  )
}
const InlineFlexStyled = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  gap: ${(props) => `${props.gap}rem`};
`
