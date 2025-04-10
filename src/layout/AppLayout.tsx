import React from 'react'
import Nav from '../components/nav/Nav'
import Footer from '../components/footer/Footer'

interface IAppLayout {
    children: React.ReactNode
}
export default function AppLayout({children}:IAppLayout) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}
