import React from 'react'

const Header = () => {
  return (
    <header className='flex flex-col items-center justify-center gap-6 mt-10'>
        <h1 className='text-4xl font-black'>
            User Management
        </h1>
        <p className='font-semibold'>
            Manage all users in one place. Control access, and monitor activity accross your platform.
        </p>
    </header>
)
}

export default Header