'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

const LoginPage = () => {
    const handleLogin =async (e: React.FormEvent<HTMLFormElement>) => {
        try{
         const formdata = new FormData(e.currentTarget)
         const response = await signIn('credentials',{
            email: formdata.get('email') ,
            password: formdata.get('password'),
            redirect: false
         })
         console.log({response})

        }
        catch(e){
            console.log(e)
        }
    }
  return (
    <form onSubmit={handleLogin} className='mx-auto max-w-md flex flex-col gap-3 border border-black  text-white' >
        <input className='rounded py-1 px-2 bg-white/30' name="email" type="email" />
        <input className='rounded py-1 px-2 bg-white/30' name="password" type="password" />
        <button className='rounded py-1 px-2 bg-white text-black' type="submit">Login</button>
    </form>
  )
}

export default LoginPage