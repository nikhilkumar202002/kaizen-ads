import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import OurService from './pages/OurService'
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
        </Route>
      </Routes>
    </LenisScrolling>
  )
}

export default App
