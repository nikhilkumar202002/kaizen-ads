import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const approachSteps = [
  {
    number: '01',
    title: 'Understand the business',
    description:
      'We begin with your business model, audience, competition, current performance, and objectives.',
  },
  {
    number: '02',
    title: 'Define the direction',
    description:
      'We identify priorities and build a strategy that connects your goals with the right positioning, activities, and channels.',
  },
  {
    number: '03',
    title: 'Execute with purpose',
    description:
      'We combine branding, digital marketing, creative production, and technology. Every activity has a clear place in the plan.',
  },
  {
    number: '04',
    title: 'Measure what matters',
    description:
      'We track enquiries, conversion rates, acquisition costs, sales, and campaign performance, depending on your objectives.',
  },
  {
    number: '05',
    title: 'Improve continuously',
    description:
      'We review results, learn from data and customer response, and refine. The aim is more effective marketing, not just more of it.',
  },
]

const OurApproach = () => {
  const sectionRef = useRef(null)

  // Track scroll position through the section for smooth 3D object rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Smooth scroll-driven rotation values
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, 240])
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -240])

  return (
    <div ref={sectionRef} className="relative w-full mt-0 mb-[150px]">
      {/* Outer wrapper matching desktop 50px margins */}
      <div className="relative mx-0 sm:mx-6 lg:mx-[50px]">
        {/* Right-Top Floating 3D Object */}
        <motion.img
          src="/Objects/Object-4-.png"
          alt="Decorative 3D Object"
          style={{ rotate: rotateRight }}
          className="absolute -top-12 right-0 sm:-top-18 sm:-right-6 lg:-top-24 lg:-right-12 w-28 sm:w-44 lg:w-56 h-auto object-contain z-30 pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
        />

        {/* Left-Bottom Floating 3D Object */}
        <motion.img
          src="/Objects/Object-6-1.png"
          alt="Decorative 3D Object"
          style={{ rotate: rotateLeft }}
          className="absolute -bottom-12 left-0 sm:-bottom-18 sm:-left-6 lg:-bottom-24 lg:-left-12 w-28 sm:w-40 lg:w-52 h-auto object-contain z-30 pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
        />

        {/* Section Container with Service Section Background Image & Clean Black Aesthetic */}
        <section
          id="our-approach"
          className="relative bg-black bg-cover bg-center bg-no-repeat text-white py-20 sm:py-24 lg:py-28 overflow-hidden"
          style={{ backgroundImage: "url('/Banner/service-section-background.jpg')" }}
        >
          {/* Clean dark overlay to preserve black aesthetic and ensure readability */}
          <div className="absolute inset-0 bg-black/75 pointer-events-none" />

          {/* Main Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-white mb-6 sm:mb-8">
                Our approach
              </h2>
              {/* Divider under heading */}
              <div className="w-full border-b border-white/20" />
            </div>

            {/* Approach Rows */}
            <div className="divide-y divide-white/10">
              {approachSteps.map((step) => (
                <div
                  key={step.number}
                  className="py-8 sm:py-10 lg:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-12 items-center group"
                >
                  {/* Step Number (Red Outlined) */}
                  <div className="md:col-span-2">
                    <span
                      className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] leading-none tracking-tight block select-none"
                      style={{
                        WebkitTextStroke: '2px #E5314D',
                        color: 'transparent',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title */}
                  <div className="md:col-span-4 lg:col-span-4">
                    <h3 className="font-heading font-bold text-lg sm:text-xl md:text-[22px] tracking-tight text-white group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Description */}
                  <div className="md:col-span-6 lg:col-span-6">
                    <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OurApproach
