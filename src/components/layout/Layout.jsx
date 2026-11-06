import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// Smooth scroll to anchor or top on route/hash changes
const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

/**
 * Common Layout component shared across all pages.
 * Handles the persistent Header, Footer, page container, and scroll position.
 * Individual page components only need to render their own unique content.
 */
const Layout = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-x-clip text-white">
      <ScrollToAnchor />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

