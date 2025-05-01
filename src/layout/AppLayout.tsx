import React from 'react'
import Nav from '../components/nav/Nav'
import Footer from '../components/footer/Footer'
import { useLocation } from 'react-router-dom'

interface IAppLayout {
    children: React.ReactNode
}
export default function AppLayout({children}:IAppLayout) {
  const location = useLocation()
  return (
    <div>
      <Nav />
      <div className='pt-26'>
        {children}
      </div>
      
      {location.pathname !== "/profile" && <Footer />}
    </div>
  )
}
