import { motion } from 'framer-motion'

const ServiceBanner = ({
  backgroundImage = '/Banner/about-banner.webp',
}) => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  return (
    <section
      className="relative w-full h-[60vh] min-h-[380px] bg-cover bg-center bg-no-repeat flex flex-col justify-end overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Dark overlay for contrast and legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 pointer-events-none" />

      {/* Content pinned to the bottom-left corner */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16 pt-24 flex flex-col items-start justify-end">
        {/* Section Tag */}
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="flex items-center gap-2.5 mb-3 sm:mb-4"
        >
          <span className="w-2.5 h-2.5 bg-primary" />
          <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/80">
            Our Services
          </span>
        </motion.div>

        {/* Banner Content */}
        <motion.h1
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="font-heading text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-normal leading-[1.12] tracking-tight max-w-4xl"
        >
          Think, create, execute: five service groups.
        </motion.h1>
      </div>
    </section>
  )
}

export default ServiceBanner
