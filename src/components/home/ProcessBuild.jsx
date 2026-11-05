import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    number: '01',
    stepNumber: '1',
    title: 'Discovery',
    subtitle: 'Phase 01 · Alignment',
    description: 'Understand the business, challenges, customers and goals.',
    tag: 'Research & Audit',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '02',
    stepNumber: '2',
    title: 'Strategy',
    subtitle: 'Phase 02 · Blueprint',
    description: 'Identify priorities, opportunities, positioning and the right growth plan.',
    tag: 'Roadmap & Architecture',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '03',
    stepNumber: '3',
    title: 'Execution',
    subtitle: 'Phase 03 · Activation',
    description: 'Activate the right mix of marketing, branding, creative and technology.',
    tag: 'Creative & Tech Delivery',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '04',
    stepNumber: '4',
    title: 'Measurement',
    subtitle: 'Phase 04 · Analytics',
    description: 'Evaluate performance against agreed business objectives.',
    tag: 'Data & Revenue Tracking',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '05',
    stepNumber: '5',
    title: 'Continuous improvement',
    subtitle: 'Phase 05 · The Kaizen Cycle',
    description: 'Learn, refine and repeat to improve results over time.',
    tag: 'Compound Growth',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&auto=format&fit=crop&q=80',
  },
]

const ProcessBuild = () => {
  const targetRef = useRef(null)

  // Track scroll position through the tall vertical track for horizontal scroll animation
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // Horizontal translation from 0% to -68% as the user scrolls
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%'])

  return (
    <section
      id="process"
      ref={targetRef}
      className="relative h-[300vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Viewport with 150px Top and Bottom Padding */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 sm:py-24 lg:py-[150px] overflow-hidden">
        
        {/* Top Header & Section Title */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-20">
          
          {/* Subheading with Red Square Indicator */}
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-2.5 h-2.5 bg-primary" />
            <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
              Our Process
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-white">
                A process built on{' '}
                <span className="text-primary">continuous improvement</span>
              </h2>
            </div>

            {/* Scroll Progress Indicator & Step Count */}
            <div className="hidden md:flex flex-col items-end gap-2 pb-1">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Scroll to explore timeline →
              </span>
              <div className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                  className="w-full h-full bg-primary"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Horizontal Scrolling Timeline Track */}
        <div className="relative w-full my-auto z-10 pl-4 sm:pl-6 lg:pl-16">
          <motion.div
            style={{ x }}
            className="flex gap-6 sm:gap-8 lg:gap-10 w-max pr-8 sm:pr-16 lg:pr-32"
          >
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative w-[310px] sm:w-[400px] lg:w-[460px] shrink-0 flex flex-col rounded-none bg-zinc-950/90 p-6 sm:p-8 shadow-2xl"
              >
                {/* Timeline Header with Step Number & Connecting Line */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                      {step.number}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400">
                      {step.subtitle}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] sm:text-xs text-neutral-400 bg-white/5 px-2.5 py-1 rounded-none uppercase">
                    {step.tag}
                  </span>
                </div>

                {/* Step Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 bg-zinc-900 rounded-none">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>

                {/* Step Title & Description */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-white mb-2.5 group-hover:text-primary transition-colors duration-200">
                      {step.stepNumber}. {step.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Line Marker */}
                  <div className="pt-6 mt-6 flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>STEP {index + 1} OF {steps.length}</span>
                    <span className="text-primary font-bold">KAIZEN METHOD</span>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Timeline Baseline (Borderless) */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-20">
          <div className="flex items-center justify-between pt-4 text-xs text-neutral-400 font-mono">
            <span>01 / DISCOVERY</span>
            <span>02 / STRATEGY</span>
            <span>03 / EXECUTION</span>
            <span>04 / MEASUREMENT</span>
            <span>05 / CONTINUOUS IMPROVEMENT</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProcessBuild
