import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar } from "./Components/Navbar";
import { HomePage } from "./Components/HeroPage";
import { AllProducts } from "./Components/AllProduct";
import { ContactUs } from "./Components/ContactUs";
import { Getlook } from "./Components/Getlook";

function App() {
  const [currentGradient, setCurrentGradient] = useState(
    "from-[#ffa703] via-[#FFD048] to-[#ffa703]"
  );

  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden">
        
        {/* Navbar Global */}
        

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <MainContent
                currentGradient={currentGradient}
                onGradientChange={setCurrentGradient}
              />
            }
          />

          {/* Separate Route */}
          <Route path="/getlook" element={<Getlook />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainContent({
  currentGradient,
  onGradientChange,
}) {
  return (
    <div
      className={`bg-gradient-to-r ${
        currentGradient ||
        "from-[#ffa703] via-[#FFD048] to-[#ffa703]"
      } transition-all duration-700 min-h-screen`}
    >
      <Navbar />
      <HomePage
        onGradientChange={onGradientChange}
      />

      <AllProducts />

      <ContactUs
        currentGradient={currentGradient}
      />
    </div>
  );
}

export default App;






