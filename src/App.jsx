import React from 'react'
import { Route, Routes } from 'react-router'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

const App = () => {
  return (
    <div className='font-mono text-slate-900 px-4'>
      <Header />
      <Routes>
        <Route index element = {<Dashboard/>} />
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App