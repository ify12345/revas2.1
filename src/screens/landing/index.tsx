import NavBar from '@/components/Navbar'
import * as React from 'react'
import Hero from './hero'
import Body from './body'
import Footer from './footer'
import Peace from './peace'

export default function LandingPage() {
  return (
    <div className="">
      <NavBar />
      <Hero />
      <Body />
      <Peace />
      <Footer />
    </div>
  )
}
