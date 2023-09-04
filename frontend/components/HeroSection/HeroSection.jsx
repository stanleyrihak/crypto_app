import React, { useState, useEffect, useRef, Fragment } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { COLORS } from '@/utils/theme'

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({})
  const [windowSize, setWindowSize] = useState({})

  useEffect(() => {
    setWindowSize({ x: window.innerWidth, y: window.innerHeight })
  }, [])

  // updates mousePos state
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const imageMovement = {
    transform: `translate(
      ${(windowSize.x / 2 - mousePos.x) / 50}px,
      ${(windowSize.y / 2 - mousePos.y) / 50}px)
      `,
  }

  return (
    <HeroWrapper>
      {/* center text going back and fourth */}
      <TextAnimation>
        <HeroTextB>
          Welcome to my <HighlightB>crypto app</HighlightB>. Here you can view current prices of crypto, view their
          charts or even try <HighlightB>demo trading</HighlightB>. Scroll down to see more.
        </HeroTextB>
        <HeroTextT>
          Welcome to my <HighlightT>crypto app</HighlightT>. Here you can view current prices of crypto, view their
          charts or even try <HighlightT>demo trading</HighlightT>. Scroll down to see more.
        </HeroTextT>
      </TextAnimation>
      {/* center macbook image */}
      <ImageWrapper>
        <ImageContainer>
          <HeroImage style={imageMovement} src='./images/newmockup.png' alt='' />
        </ImageContainer>
      </ImageWrapper>
      {/* bottom of hero section */}
      <TransitionImg src='./images/transition-block.svg' />
    </HeroWrapper>
  )
}

export default HeroSection

// keyframes
const ANIMATION_LEFT = keyframes`
  100%{transform:translateX(calc(-100% - 100vw))}
`
const ANIMATION_RIGHT = keyframes`
  100%{transform:translateX(calc(+100% + 100vw))}
`

// styling
const HeroWrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: ${COLORS.light_purple};
`
const TextAnimation = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Font = css`
  font-family: 'Chaney';
  font-weight: bold;
  font-size: 5rem;
  color: transparent;

  white-space: nowrap;
`
const HeroTextB = styled.span`
  ${Font}
  color: ${COLORS.very_dark_purple};

  position: absolute;
  left: 100%;
  bottom: 1rem;
  animation: ${ANIMATION_LEFT} 25s linear infinite;
`
const HeroTextT = styled.span`
  ${Font}

  position: absolute;
  top: 1rem;
  right: 100%;

  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${COLORS.very_dark_purple};
  animation: ${ANIMATION_RIGHT} 25s linear infinite;
`
const HighlightB = styled.span`
  ${Font}
  color: ${COLORS.light_green};
`
const HighlightT = styled.span`
  ${Font}
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${COLORS.light_green};
`
const ImageWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const ImageContainer = styled.div`
  margin: auto;
  position: relative;
  max-width: 660px;
  padding: 2rem;
`
const HeroImage = styled.img`
  width: 100%;
  height: auto;
`
const TransitionImg = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
`
