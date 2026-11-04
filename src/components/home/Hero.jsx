import { motion } from 'framer-motion'
import Button from '../ui/Button'

const Hero = () => {
  const headingLines = [
    'Growth comes',
    'from doing the',
    'right things.',
  ]

  const keywords = [
    'Understand',
    'Strategize',
    'Execute',
    'Measure',
    'Improve',
  ]

  // Smooth fade-and-rise animation variant with custom staggered delay
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  // Keywords stagger animation variant
  const keywordVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  return (
    <section
      className="relative w-full min-h-screen lg:h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{ backgroundImage: "url('/Banner/hero-banner.webp')" }}
    >
      {/* Main Container Aligned with Header Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 lg:pb-14 flex-1">
        
        {/* Main Heading (Top) - Animated line by line */}
        <div className="pt-2 sm:pt-4">
          <h1 className="font-heading text-white text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] font-normal leading-[1.02] tracking-tight drop-shadow-sm max-w-4xl">
            {headingLines.map((line, index) => (
              <motion.span
                key={line}
                custom={0.2 + index * 0.15}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Bottom Section: Left (Description + CTAs) & Right (Keywords) */}
        <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Side: Description & Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-6">
            <motion.p
              custom={0.65}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="font-sans text-white/85 text-base sm:text-lg md:text-[18px] leading-relaxed max-w-xl"
            >
              Kaizen Ads is a growth marketing partner. We learn your business first, build the strategy, then bring in only the services that strategy calls for.
            </motion.p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-1">
              <motion.div
                custom={0.8}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
              >
                <Button
                  href="#contact"
                  variant="primary"
                  text="Book a discovery call"
                />
              </motion.div>

              <motion.div
                custom={0.92}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
              >
                <Button
                  href="#about"
                  variant="outline"
                  text="How we think"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Side: Keywords */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start lg:items-end space-y-1.5 sm:space-y-2">
            {keywords.map((word, index) => (
              <motion.span
                key={word}
                custom={1.04 + index * 0.12}
                initial="hidden"
                animate="visible"
                variants={keywordVariant}
                className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide transition-colors hover:text-primary cursor-default"
              >
                {word}
              </motion.span>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero
