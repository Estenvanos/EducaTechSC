import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='text-black '>
      HOME
      <UserButton />
    </div>
  )
}

export default page