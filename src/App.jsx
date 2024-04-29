import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import HeroSection from './Components/HeroSection'
import Footer from './Components/Footer'
import MainModule from './Components/MainModule'
import AboutUs from './Components/AboutUs'
import ContactUs from './Components/ContactUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <HeroSection />
      <MainModule />
      <AboutUs />
      <ContactUs />
      <Footer />
    </>
  )
}

export default App
