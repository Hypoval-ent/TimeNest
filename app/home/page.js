"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
const page = () => {
  return (
    <>
    <div>page</div>
    <button onClick={()=>{signOut({ callbackUrl: "/login" })}}>signOut</button>
    </>
  )
}

export default page