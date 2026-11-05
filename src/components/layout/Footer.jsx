import { FiMail, FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const pagesLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Digital Marketing', href: '#services' },
    { label: 'Web Development', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
  ]

  const serviceLinks = [
    { label: 'Branding & Identity', href: '#services' },
    { label: 'Growth & Performance', href: '#services' },
    { label: 'Web & Digital Platforms', href: '#services' },
    { label: 'Creative Direction', href: '#services' },
    { label: 'Paid Media & Ads', href: '#services' },
    { label: 'Commercial Video', href: '#services' },
  ]

  const companyLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolios', href: '#portfolio' },
    { label: 'Approach', href: '#diagnostic' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy Policy', href: '#' },
  ]

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
  ]

  return (
    <footer className="relative w-full bg-black text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-hidden border-t border-white/10">
      
      {/* Top Bar with Horizontal Divider & Centered Scroll-to-Top Pill */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-20">
        
        {/* Horizontal Background Divider Line behind Pill */}
        <div className="absolute top-1/2 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 h-[1px] bg-white/10 -translate-y-1/2 hidden md:block" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Left: Email */}
          <div className="z-10 bg-black md:pr-6">
            <a
              href="mailto:hello@kaizenads.com"
              className="group inline-flex items-center gap-2.5 font-sans text-sm sm:text-base text-white/80 hover:text-white transition-colors"
            >
              <FiMail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span>hello@kaizenads.com</span>
            </a>
          </div>

          {/* Center: Scroll to Top Capsule / Pill Button */}
          <div className="z-10 bg-black md:px-6">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group relative w-9 h-14 sm:w-10 sm:h-16 rounded-full border border-white/20 hover:border-primary bg-black flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-primary/20"
            >
              <FiArrowUp className="w-4 h-4 text-white group-hover:text-primary transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Right: Social Links with Pipe Separator */}
          <div className="z-10 bg-black md:pl-6 flex items-center flex-wrap justify-center gap-2.5 sm:gap-3 font-sans text-sm sm:text-base text-white/70">
            {socialLinks.map((item, index) => (
              <div key={item.label} className="inline-flex items-center gap-2.5 sm:gap-3">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
                {index < socialLinks.length - 1 && (
                  <span className="text-white/25 select-none">|</span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Massive Brand Watermark Typography */}
      <div className="w-full my-6 sm:my-10 lg:my-14 overflow-hidden select-none pointer-events-none">
        <h2 className="font-heading text-center font-bold tracking-tight uppercase leading-[0.85] text-white/[0.08] text-[15vw] sm:text-[16vw] lg:text-[17vw] whitespace-nowrap">
          KAIZEN ADS
        </h2>
      </div>

      {/* Bottom 4-Column Navigation Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Column 1: PAGES */}
          <div>
            <h3 className="font-heading text-sm sm:text-base font-semibold tracking-wider uppercase text-white mb-4 sm:mb-6">
              PAGES
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm text-neutral-400">
              {pagesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: SERVICE */}
          <div>
            <h3 className="font-heading text-sm sm:text-base font-semibold tracking-wider uppercase text-white mb-4 sm:mb-6">
              SERVICE
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm text-neutral-400">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <h3 className="font-heading text-sm sm:text-base font-semibold tracking-wider uppercase text-white mb-4 sm:mb-6">
              COMPANY
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm text-neutral-400">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: ADDRESS */}
          <div>
            <h3 className="font-heading text-sm sm:text-base font-semibold tracking-wider uppercase text-white mb-4 sm:mb-6">
              ADDRESS
            </h3>
            <div className="space-y-3 sm:space-y-4 font-sans text-xs sm:text-sm text-neutral-400">
              <div>
                <a
                  href="https://maps.google.com/?q=Kozhikode,Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-white transition-colors block text-white/90"
                >
                  Kozhikode, Kerala,
                  <br />
                  India
                </a>
              </div>
              <div>
                <a
                  href="tel:+919876543210"
                  className="hover:text-white transition-colors block text-neutral-300"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <a
                  href="mailto:hello@kaizenads.com"
                  className="hover:text-white transition-colors block text-neutral-300"
                >
                  hello@kaizenads.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Micro Copyright Bar */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-500">
          <p>© {new Date().getFullYear()} Kaizen Ads. All rights reserved.</p>
          <p className="text-neutral-500">Growth Marketing Partner · Kozhikode, Kerala</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
