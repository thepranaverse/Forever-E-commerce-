import React from 'react'
import HomeHero from '../components/HomeHero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsSletterBox from '../components/NewsSletterBox'

const Home = () => {
  return (
    <div>
      <HomeHero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsSletterBox/>
    </div>
  )
}

export default Home