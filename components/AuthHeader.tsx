import Image from 'next/image'
import React from 'react'

const AuthHeader = () => {
  return (
    <div className='flex flex-col sticky top-0 w-full h-30 place-items-center'>
        <Image src='/logo.png' alt='logo' width={340} height={300} className='my-auto'/>
    </div>
  )
}

export default AuthHeader