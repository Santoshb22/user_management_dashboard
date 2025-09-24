import React from 'react'

const Filter = () => {
    
    const hanldeAddUser = () => {
    }
    
  return (
    <div className='flex justify-between'>
        <div className='flex items-center rounded-2xl border px-4 py-1'>
            <label htmlFor="search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </label>
            <input
            className='outline-none px-2 py-1 min-w-72'
            type="text" 
            placeholder='Search'
            />
        </div>

        <button 
        onClick={hanldeAddUser}
        className='flex  items-center gap-2 bg-slate-900 text-white px-4 py-1 rounded-2xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            Add User
        </button>
    </div>
  )
}

export default Filter


