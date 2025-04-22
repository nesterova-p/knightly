import Image from 'next/image'
import Navbar from '@/Landing/Navbar'
import HeroSection from '@/Landing/HeroSection'
// pages/_app.js
import './globals.css'

export default function Home() {
  return (
      <div>
        <Navbar />
        <HeroSection />
        {/*Image and other s-f*/}
      </div>
  )
}
