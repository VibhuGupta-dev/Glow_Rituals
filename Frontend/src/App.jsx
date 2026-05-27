import './App.css'
import { useState } from 'react'
import { HomePage } from './Components/HeroPage'
import { Aboutus } from './Components/Aboutus'
import { Navbar } from './Components/Navbar'
import { AllProducts } from './Components/AllProduct'
import { ContactUs } from './Components/ContactUs'
function App() {
  const [currentGradient, setCurrentGradient] = useState("from-[#ffa703] via-[#FFD048] to-[#ffa703]")

  return (
   
    <div className={`bg-gradient-to-r ${currentGradient} transition-all duration-700`}>
      <Navbar />
      <HomePage onGradientChange={setCurrentGradient} />
      <AllProducts />
      <Aboutus currentGradient={currentGradient} />
      <ContactUs currentGradient={currentGradient} />
    </div>
  )
}

export default App