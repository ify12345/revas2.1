import NavBarWhite from '@/components/NavbarWhite'
import React from 'react'
import Body from './body'
import Footer from '../landing/footer'
import Detail from './detail'
import Transforming from './transforming'

export default function About() {
  return (
    <div>
      <NavBarWhite />
      <Body />
      <Detail />
      <Transforming/>
      <Footer />
    </div>
  )
}
