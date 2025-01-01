import React from 'react'
import Navbar2 from '../components/Navbar/Navbar2'
import LoginSignup from '../components/LoginSignup/LoginSignup'
import Navbar1 from '../components/Navbar/Navbar1'

const Login = () => {
  return (
    <>
        <Navbar1 />
        <div className='flex justify-center items-center w-[100vw] h-[90vh]'>
            <LoginSignup />
        </div>
    </>
  )
}

export default Login
