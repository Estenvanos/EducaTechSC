"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'


const RootHeader = () => {
  return (
    <header className='flex flex-row justify-between py-2.5  w-full'>
    <Image 
    onClick={() => redirect("/")}
    src="/logo.png" alt="logo" width={200} height={160} className="cursor-pointer"/>
    <UserButton />
    </header>
  )
}

export default RootHeader