import { useEffect } from 'react'
import Header from './component/header/Header'
import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './component/footer/Footer'
function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      console.log(postion)
    })
  }, [])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
