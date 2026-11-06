import Hero from '../components/home/Hero'
import About from '../components/home/About'
import FeaturedPortfolio from '../components/home/FeaturedPortfolio'
import ServiceCards from '../components/home/ServiceCards'
import BusinessQuestions from '../components/home/BusinessQuestions'
import ProcessBuild from '../components/home/ProcessBuild'
import CtaHome from '../components/home/CtaHome'

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <FeaturedPortfolio />
      <ServiceCards />
      <BusinessQuestions />
      <ProcessBuild />
      <CtaHome />
    </>
  )
}

export default Home
