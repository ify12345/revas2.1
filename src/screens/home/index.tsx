import { Navigation } from '@/components/Navigation.js'
import NavOptions from '@/components/NavOptions.js'
import * as React from 'react';


const Home = () => {
  return (
    <div className='overflow-x-hidden h-screen'>
     <Navigation/>
     {/* links */}
     <NavOptions/>

    </div>
  )
}

export default Home
