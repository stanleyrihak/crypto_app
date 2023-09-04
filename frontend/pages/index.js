import React from 'react'

import Navbar from '@/components/Navbar/Navbar'
import GeneralData from '@/components/GeneralData/GeneralData'
import Market from '@/components/Market/Market'
import HeroSection from '@/components/HeroSection/HeroSection'
import Footer from '@/components/Footer/Footer'

const LOGO_CONTENT = 'Crypto app'

export default function Home({ generalData }) {
  return (
    <>
      <header id='top'>
        <Navbar logoContent={LOGO_CONTENT} />
      </header>
      <main>
        <HeroSection />
        <GeneralData data={generalData} />
        <Market /> {/*  data={marketData} */}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

// DATA via API
export const getServerSideProps = async (context) => {
  const rawGeneralData = await fetch('http://localhost:4000/globals')
  const jsonGeneralData = await rawGeneralData.json()
  const generalData = jsonGeneralData

  /* const rawMarketData = await fetch('http://localhost:4000/coins/merged')
  const jsonMarketData = await rawMarketData.json()
  const marketData = jsonMarketData */

  return {
    props: { generalData }, // marketData
  }
}
