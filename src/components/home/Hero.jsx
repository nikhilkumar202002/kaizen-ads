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
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between overflow-hidden"
      style={{ backgroundImage: "url('/Banner/hero-banner.webp')" }}
    >
      {/* Main Container Aligned with Header Grid */}
      <div className="hero-container relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-28 xl:pt-32 pb-6 sm:pb-8 lg:pb-10 xl:pb-12 flex-1">
        
        {/* Main Heading (Top) - Animated line by line */}
        <div className="pt-1 sm:pt-2">
          <h1 className="hero-heading font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[76px] 2xl:text-[88px] font-normal leading-[1.03] tracking-tight drop-shadow-sm max-w-4xl">
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
        <div className="hero-bottom-grid pt-6 sm:pt-8 lg:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-end">
          
          {/* Left Side: Description & Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-4 sm:space-y-5 lg:space-y-6">
            <motion.p
              custom={0.65}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="hero-desc font-sans text-white/85 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-xl"
            >
              Kaizen Ads is a growth marketing partner. We learn your business first, build the strategy, then bring in only the services that strategy calls for.
            </motion.p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 lg:gap-5 pt-1">
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

          {/* Desktop Right Side: Keywords (Stacked Vertically on Desktop) */}
          <div className="hero-keywords hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col items-end space-y-1 sm:space-y-1.5 lg:space-y-1.5 xl:space-y-2">
            {keywords.map((word, index) => (
              <motion.span
                key={word}
                custom={1.04 + index * 0.12}
                initial="hidden"
                animate="visible"
                variants={keywordVariant}
                className="text-white text-sm sm:text-base lg:text-base xl:text-lg font-normal tracking-wide transition-colors hover:text-primary cursor-default"
              >
                {word}
              </motion.span>
            ))}
          </div>

        </div>

        {/* Mobile View: Continuous Infinite Horizontal Keyword Slider (< lg) */}
        <motion.div
          custom={1.0}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="lg:hidden w-full pt-6 pb-1 overflow-hidden"
        >
          <div className="relative w-full overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee-infinite flex items-center">
              {/* Group 1 */}
              <div className="flex items-center gap-6 pr-6 flex-shrink-0">
                {[...keywords, ...keywords].map((word, index) => (
                  <div key={`g1-${word}-${index}`} className="flex items-center gap-6 flex-shrink-0">
                    <span className="text-white text-base sm:text-lg font-normal tracking-wide whitespace-nowrap">
                      {word}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 opacity-80" />
                  </div>
                ))}
              </div>

              {/* Group 2 (Identical twin for seamless 100% infinite loop) */}
              <div className="flex items-center gap-6 pr-6 flex-shrink-0" aria-hidden="true">
                {[...keywords, ...keywords].map((word, index) => (
                  <div key={`g2-${word}-${index}`} className="flex items-center gap-6 flex-shrink-0">
                    <span className="text-white text-base sm:text-lg font-normal tracking-wide whitespace-nowrap">
                      {word}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 opacity-80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
