import bluebusLogo from '../assets/bluebus-logo.png';
import'../App.css';
import React from 'react'

const Header = () => {
  return (
    <>
    <div className='h-24 w-128'>
    <img className='border-red-400  inline pl-4 'src={bluebusLogo} alt='BlueBus' BlueBus />
    <div className=' inline-block h-24 float-right pt-6 px-8 '>
    <p className='inline-block pr-4'>Help</p>
    <p className='inline-block ' >Sign In</p>
    </div>
    </div>
    </>
  )
}

export default Header