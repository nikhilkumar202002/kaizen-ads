import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import OurService from './pages/OurService'
import ContactUs from './pages/ContactUs'
import OurPortfolio from './pages/OurPortfolio'
import LenisScrolling from './components/ui/LenisScrolling'

const App = () => {
  return (
    <LenisScrolling>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<OurService />} />
          <Route path="our-service" element={<OurService />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="portfolio" element={<OurPortfolio />} />
          <Route path="our-portfolio" element={<OurPortfolio />} />
        </Route>
      </Routes>
    </LenisScrolling>
  )
}

export default App
