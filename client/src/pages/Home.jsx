import React from 'react'
import Hero from '../components/hero'
import Policies from '../components/policies'
import Latestupdates from '../components/latestupdates'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Hero /> 
      <Latestupdates />
      <Policies />
      <Footer/>
      </div>
  )
}

export default Home