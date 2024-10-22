import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='bam'>
        <h1 className='h1'>Welcome to chitzeria</h1>
        <h1 className='h2'>Lets Explore our rooms</h1>
        <Link to="/rum">
          <button className='h3'>Rooms</button>
        </Link>
    </div>
  )
}

export default Home