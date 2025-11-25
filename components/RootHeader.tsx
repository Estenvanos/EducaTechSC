import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const RootHeader = () => {
  return (
    <header className='flex flex-row justify-between py-2.5  w-full'>
    <Image src="/logo.png" alt="logo" width={200} height={160} className=""/>
    <UserButton />
    </header>
  )
}

export default RootHeader