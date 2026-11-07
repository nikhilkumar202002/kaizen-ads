import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button'
import { trackPhoneClick } from '../../utils/tracking.service'

const ServiceCta = ({
  buttonVariant = 'white',
}) => {
  const sectionRef = useRef(null)

  // Track scroll position through the section for smooth object rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Smooth scroll-driven rotation values matching the home and about CTA
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

        {/* Section Container with Home CTA Banner Background (No border radius) */}
        <section
          id="cta"
          className="relative bg-cover bg-center bg-no-repeat text-white py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden rounded-none"
          style={{ backgroundImage: "url('/Banner/home-cta-banner.webp')" }}
        >
          {/* Subtle overlay to ensure crisp contrast */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Left-Aligned Content Container matching the reference design */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left"
            >
              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.08] tracking-tight text-white max-w-2xl">
                Not sure which <br className="hidden sm:inline" />
                service you need?
              </h2>

              {/* Subtitle */}
              <p className="font-sans text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mt-4 sm:mt-5">
                That&rsquo;s what discovery is for. We&rsquo;ll tell you what makes sense, and what doesn&rsquo;t.
              </p>

              {/* Standardized Button Component */}
              <div className="mt-8 sm:mt-10 lg:mt-12">
                <Button
                  href="tel:+919605281668"
                  onClick={() => trackPhoneClick('+919605281668')}
                  variant={buttonVariant}
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

export default ServiceCta
