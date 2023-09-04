import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { COLORS, WEIGHT } from '@/utils/theme'
import { InlineFlex } from '@/components/Flex/Flex'

import LinkEffect from '@/components/LinkEffect/LinkEffect'

const Navbar = ({ logoContent }) => {
  const [isUserOnLanding, setIsUserOnLanding] = useState(true)

  // checks if is user still on landing section
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.innerHeight <= window.scrollY) {
        setIsUserOnLanding(false)
      } else {
        setIsUserOnLanding(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // changes the color of nav elements
  const scrollStyle = {
    color: `${isUserOnLanding ? COLORS.very_dark_purple : COLORS.white}`,
  }

  return (
    <>
      <NavWrapper>
        <NavContent>
          <NavLogo style={scrollStyle}>{logoContent}</NavLogo>

          <CenterLogo style={scrollStyle}>Stanislav Rihak</CenterLogo>

          <Links justify='flex-end' align='center' gap={4}>
            <LinkEffect>
              <Link style={scrollStyle} href='/#top' scroll={false}>
                Home
              </Link>
            </LinkEffect>
            <LinkEffect>
              <Link style={scrollStyle} href='/#market' scroll={false}>
                Overview
              </Link>
            </LinkEffect>
          </Links>
        </NavContent>
      </NavWrapper>
    </>
  )
}

export default Navbar

const NavWrapper = styled.div`
  z-index: 5;
  position: fixed;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NavContent = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;

  @media only screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const NavLogo = styled.span`
  transition: 0.3s;
  font-weight: 700;
  font-size: 1.25rem;
  justify-self: end;

  @media only screen and (max-width: 1000px) {
    font-size: 1.5rem;
  }
`
const CenterLogo = styled.span`
  font-size: 1.75rem;
  font-family: 'Mustang';
  justify-self: center;
  color: ${COLORS.very_dark_purple};

  @media only screen and (max-width: 1000px) {
    display: none;
  }
`
const Links = styled(InlineFlex)`
  justify-self: start;
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`
