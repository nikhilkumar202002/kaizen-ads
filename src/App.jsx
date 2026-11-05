import Header from './components/layout/Header'
import Hero from './components/home/Hero'
import About from './components/home/About'
import ServiceCards from './components/home/ServiceCards'
import FeaturedPortfolio from './components/home/FeaturedPortfolio'
import BusinessQuestions from './components/home/BusinessQuestions'
import Footer from './components/layout/Footer'
import LenisScrolling from './components/ui/LenisScrolling'

const App = () => {
  return (
    <LenisScrolling>
      <div className="relative min-h-screen bg-black overflow-x-clip">
        <Header />
        <main>
          <Hero />
          <About />
          <FeaturedPortfolio />
          <ServiceCards />
          <BusinessQuestions />
        </main>
        <Footer />
      </div>
    </LenisScrolling>
  )
}

export default App