import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    number: '01',
    stepNumber: '1',
    title: 'Discovery',
    description: 'Understand the business, challenges, customers and goals.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '02',
    stepNumber: '2',
    title: 'Strategy',
    description: 'Identify priorities, opportunities, positioning and the right growth plan.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '03',
    stepNumber: '3',
    title: 'Execution',
    description: 'Activate the right mix of marketing, branding, creative and technology.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '04',
    stepNumber: '4',
    title: 'Measurement',
    description: 'Evaluate performance against agreed business objectives.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
  },
  {
    number: '05',
    stepNumber: '5',
    title: 'Continuous improvement',
    description: 'Learn, refine and repeat to improve results over time.',
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

  // Horizontal translation starting exactly from the left alignment of the heading
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-64%'])

  return (
    <section
      id="process"
      ref={targetRef}
      className="relative h-[300vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Viewport with 150px Top and Bottom Padding */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center py-16 sm:py-24 lg:py-[150px] overflow-hidden">
        
        {/* Main Content Container: Heading and Timeline Share the Exact Same Left Alignment */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          
          {/* Heading on 2 Lines with Margin Bottom 50px */}
          <div className="mb-[50px]">
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-white">
              <span className="block">A process built on</span>
              <span className="block text-primary">continuous improvement</span>
            </h2>
          </div>

          {/* Horizontal Scrolling Timeline Track - Aligned to Left of Heading */}
          <div className="relative w-full overflow-visible">
            <motion.div
              style={{ x }}
              className="flex gap-8 lg:gap-12 w-max"
            >
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="group relative w-[310px] sm:w-[380px] lg:w-[420px] shrink-0 flex flex-col"
                >
                  {/* 1. Step Image (No Card Container) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 rounded-none mb-6">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* 2. Timeline in Middle of the Item */}
                  <div className="relative flex items-center mb-5 w-full">
                    {/* Continuous horizontal timeline line */}
                    <div className="absolute left-0 right-0 h-[1px] bg-neutral-800 -z-10" />

                    {/* Step Node Marker */}
                    <div className="flex items-center gap-3 bg-black pr-4 z-10">
                      <span className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center ring-4 ring-black shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                        PHASE {step.number}
                      </span>
                    </div>
                  </div>

                  {/* 3. Process Heading */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-normal text-white mb-2.5 group-hover:text-primary transition-colors duration-200">
                    {step.stepNumber}. {step.title}
                  </h3>

                  {/* 4. Description on 17px Font Size */}
                  <p className="font-sans text-[17px] font-normal text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>

                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ProcessBuild
