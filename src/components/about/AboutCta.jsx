import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button'

const CtaHome = () => {
  const sectionRef = useRef(null)

  // Track scroll position through the section for smooth object rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Smooth scroll-driven rotation values matching the service card section
  const rotateScroll = useTransform(scrollYProgress, [0, 1], [0, 240])

  return (
    <div ref={sectionRef} id="contact" className="relative w-full py-8 sm:py-12 lg:py-16 mb-[150px]">
      
      {/* Outer wrapper matching desktop 50px margins */}
      <div className="relative mx-0 sm:mx-6 lg:mx-[50px]">

        {/* Top-Right Floating 3D Object - Kept outside the section */}
        <motion.div
          style={{ rotate: rotateScroll }}
          className="absolute -top-12 right-0 sm:-top-18 sm:-right-6 lg:-top-24 lg:-right-12 z-30 pointer-events-none"
        >
          <motion.img
            src="/Objects/Object-4-.png"
            alt="Decorative 3D Object"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
            className="w-28 sm:w-44 lg:w-56 h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          />
        </motion.div>

        {/* Section Container with Home CTA Banner Background */}
        <section
          id="cta"
          className="relative bg-cover bg-center bg-no-repeat text-white py-20 sm:py-28 lg:py-32 overflow-hidden"
          style={{ backgroundImage: "url('/Banner/home-cta-banner.webp')" }}
        >
          {/* Subtle Overlay to ensure crisp contrast */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Center-Aligned Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center"
            >
              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-white max-w-4xl">
                Let’s find out what your business actually needs.
              </h2>

              {/* Centered CTA Button */}
              <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
                <Button
                  href="#contact"
                  variant="primary"
                  text="Book a discovery call"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CtaHome
