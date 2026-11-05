import Header from './components/layout/Header'
import Hero from './components/home/Hero'
import About from './components/home/About'
import ServiceCards from './components/home/ServiceCards'
import FeaturedPortfolio from './components/home/FeaturedPortfolio'

const App = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedPortfolio />
        <ServiceCards />

      </main>
    </div>
  )
}

export default App