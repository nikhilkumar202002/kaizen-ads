import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button'

const AboutCta = () => {
  const sectionRef = useRef(null)

  // Track scroll position through the section for smooth object rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Smooth scroll-driven rotation values matching the home CTA
  const rotateScroll = useTransform(scrollYProgress, [0, 1], [0, 240])

  return (
    <div ref={sectionRef} id="contact" className="relative w-full py-8 sm:py-12 lg:py-16 mb-[150px]">
      {/* Outer wrapper matching desktop 50px margins */}
      <div className="relative mx-0 sm:mx-6 lg:mx-[50px]">
        {/* Top-Right Floating 3D Object */}
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

        {/* Section Container with Home CTA Banner Background (No border radius) */}
        <section
          id="cta"
          className="relative bg-cover bg-center bg-no-repeat text-white py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden"
          style={{ backgroundImage: "url('/Banner/home-cta-banner.webp')" }}
        >
          {/* Subtle overlay to ensure crisp contrast */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Main 2-Column Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
            >
              {/* Left Column: Tag & Main Heading */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <span className="font-heading font-semibold text-sm sm:text-base tracking-wide text-white/90 mb-4 sm:mb-6 block">
                  Our belief
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-bold leading-[1.08] tracking-tight text-white max-w-xl">
                  Better marketing starts with better decisions.
                </h2>
              </div>

              {/* Right Column: Narrative & CTA Button */}
              <div className="lg:col-span-6 flex flex-col items-start space-y-7 sm:space-y-8 lg:space-y-10">
                <p className="font-sans text-white/90 text-base sm:text-lg lg:text-[17px] leading-relaxed max-w-xl">
                  We believe strategy should guide execution, creativity should serve a purpose, and marketing should connect to real business objectives. Growth is not a one-time campaign. It’s a continuous process of making better decisions, taking meaningful action, and improving with every step.
                </p>

                {/* Standardized Button Component */}
                <div>
                  <Button
                    href="#contact"
                    variant="primary"
                    text="Book a discovery call"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutCta
