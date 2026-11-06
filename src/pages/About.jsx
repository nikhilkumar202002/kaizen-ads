import Header from '../components/layout/Header'
import AboutBanner from '../components/about/AboutBanner'
import Footer from '../components/layout/Footer'

const About = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <AboutBanner />
      </main>
      <Footer />
    </div>
  )
}

export default About
