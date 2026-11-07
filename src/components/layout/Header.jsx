import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/#portfolio' },
  ]

  const checkIsActive = (href) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.replace('/', '')
    }
    if (href === '/services') {
      return (
        location.pathname === '/services' ||
        location.pathname === '/our-service' ||
        location.pathname.startsWith('/services')
      )
    }
    if (href === '/contact') {
      return (
        location.pathname === '/contact' ||
        location.pathname === '/contact-us' ||
        location.pathname.startsWith('/contact')
      )
    }
    return location.pathname === href && !location.hash
  }

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Left Side: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/Kaizen-Logo-white.png"
                alt="Kaizen Logo"
                className="h-8 sm:h-10 md:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Middle: Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((item) => {
              const isActive = checkIsActive(item.href)
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-heading text-[17px] tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-white/90 hover:text-primary font-normal'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Side: Contact Button & 2-Line Hamburger Menu */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Button href="/contact" variant="primary">
              Contact
            </Button>

            {/* 2-Line Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex flex-col justify-center items-end w-9 h-9 gap-1.5 focus:outline-none cursor-pointer group p-1"
              aria-label="Toggle menu"
            >
              <span
                className={`h-0.5 bg-white group-hover:bg-primary transition-all duration-300 rounded-full ${
                  isOpen ? 'w-6 rotate-45 translate-y-[4px]' : 'w-6'
                }`}
              />
              <span
                className={`h-0.5 bg-white group-hover:bg-primary transition-all duration-300 rounded-full ${
                  isOpen ? 'w-6 -rotate-45 -translate-y-[4px]' : 'w-4 group-hover:w-6'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Slide-down Menu Drawer */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-black/95 backdrop-blur-md ${
          isOpen ? 'max-h-96 opacity-100 border-b border-primary/20' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-5 space-y-4 flex flex-col">
          {navLinks.map((item) => {
            const isActive = checkIsActive(item.href)
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`font-heading text-[17px] py-1 transition-colors ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-white/90 hover:text-primary font-normal'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="pt-2">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
