import React from 'react'
import { Route, Routes } from 'react-router'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

const App = () => {
  return (
    <div className='font-mono text-slate-900 px-1 sm:px-4 text-sm sm:text-lg'>
      <Header />
      <Routes>
        <Route index element = {<Dashboard/>} />
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App