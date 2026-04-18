import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import gsap from 'gsap'
import { ScrollTrigger,SplitText } from 'gsap/all'
import Showcase from './components/Showcase'
import Feature from './components/Feature'
import Footer from './components/Footer'
import Highlight from './components/Highlight'
import Performance from './components/Performance'

gsap.registerPlugin(ScrollTrigger,SplitText)


const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Feature />
      <Highlight />
      <Footer/>
    </>
  )
}

export default App