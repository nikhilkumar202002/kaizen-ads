import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const engagementModels = [
  {
    tag: 'Start here',
    tagColor: 'text-primary',
    title: 'Strategy projects',
    description:
      'Standalone consulting and strategy projects. A clear strategy before you invest in execution.',
    cardStyles:
      'bg-[#14120E] border border-white/10 hover:border-white/20 h-[280px] sm:h-[320px] lg:h-[350px]',
    textStyles: 'text-neutral-400',
  },
  {
    tag: 'Build on it',
    tagColor: 'text-white',
    title: 'Individual services',
    description:
      'Individual creative and marketing services, such as a new brand identity or a performance campaign.',
    cardStyles:
      'bg-[#14120E] border border-white/10 hover:border-white/20 h-[360px] sm:h-[400px] lg:h-[440px]',
    textStyles: 'text-neutral-400',
  },
  {
    tag: 'Go all in',
    tagColor: 'text-white',
    title: 'Growth partnership',
    description:
      'Integrated growth partnerships that combine multiple capabilities, such as a complete go-to-market plan.',
    cardStyles:
      'bg-primary text-white h-[440px] sm:h-[480px] lg:h-[530px] shadow-[0_20px_60px_rgba(199,0,37,0.3)]',
    textStyles: 'text-white/90',
  },
]

const HowWeWork = () => {
  const sectionRef = useRef(null)

  // Track scroll position through the section for smooth 3D object rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Smooth scroll-driven counter-clockwise rotation
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -240])

  return (
    <div ref={sectionRef} className="relative w-full">
      {/* Floating 3D Object: 50% inside and 50% outside the left screen edge, shadow removed */}
      <motion.img
        src="/Objects/Object-6-1.png"
        alt="Decorative 3D Object"
        style={{ rotate: rotateLeft, x: '-50%' }}
        className="absolute -top-16 sm:-top-20 lg:-top-24 left-0 w-36 sm:w-52 lg:w-64 h-auto object-contain z-30 pointer-events-none"
      />

      <section
        id="how-we-work"
        className="relative w-full bg-black text-white py-24 sm:py-32 lg:py-36"
      >
        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-14 sm:mb-18 lg:mb-20">
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="w-2.5 h-2.5 bg-primary" />
              <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
                Engagement Models
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white mb-4 sm:mb-5 max-w-3xl">
              How we work with you
            </h2>

            <p className="font-sans text-neutral-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              Our engagement depends on what your business needs. Start small, or go all the way.
            </p>
          </div>

          {/* Stepped Height 3-Card Grid (No border radius) */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 lg:gap-8 mb-12 sm:mb-14">
            {engagementModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`p-7 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 rounded-none ${model.cardStyles}`}
              >
                {/* Top Tag */}
                <div>
                  <span
                    className={`font-sans font-semibold text-sm tracking-wide ${model.tagColor}`}
                  >
                    {model.tag}
                  </span>
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight mb-2.5 sm:mb-3">
                    {model.title}
                  </h3>
                  <p className={`font-sans text-sm sm:text-base leading-relaxed ${model.textStyles}`}>
                    {model.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Takeaway Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            We identify the right scope based on your objectives, resources, and current situation.
          </motion.p>
        </div>
      </section>
    </div>
  )
}

export default HowWeWork
