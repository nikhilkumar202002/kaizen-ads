import Header from './components/layout/Header'
import Hero from './components/home/Hero'
import About from './components/home/About'
import FeaturedPortfolio from './components/home/FeaturedPortfolio'

const App = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedPortfolio />
      </main>
    </div>
  )
}

export default App