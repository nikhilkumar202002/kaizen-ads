import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import Button from '../ui/Button'

const launchData = {
  heading: "Here’s how we’d launch it",
  subtitle: 'From idea to market launch.',
  steps: [
    { number: 1, title: 'Market and competitor research' },
    { number: 2, title: 'Brand naming and positioning' },
    { number: 3, title: 'Business and go-to-market strategy' },
    { number: 4, title: 'Identity, packaging and digital presence' },
    { number: 5, title: 'Launch campaign and customer acquisition' },
    { number: 6, title: 'Post-launch measurement and optimization' },
  ],
}

const growData = {
  heading: "Here’s how we’d grow it",
  subtitle: 'From current performance to better growth.',
  steps: [
    { number: 1, title: 'Business and marketing audit' },
    { number: 2, title: 'Customer and sales journey analysis' },
    { number: 3, title: 'Identify gaps and growth opportunities' },
    { number: 4, title: 'Build a prioritized strategy' },
    { number: 5, title: 'Execute selected initiatives' },
    { number: 6, title: 'Measure, learn and improve' },
  ],
}

const BusinessQuestions = () => {
  const [selectedOption, setSelectedOption] = useState(null)

  const activeContent = selectedOption === 'launch' ? launchData : selectedOption === 'grow' ? growData : null

  return (
    <section
      id="diagnostic"
      className="relative w-full bg-white text-black py-24 sm:py-32 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sub Heading: Square Red Indicator */}
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <span className="w-2.5 h-2.5 bg-primary" />
          <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
            Our Approach
          </span>
        </div>

        {/* Section Heading & Subheading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-black mb-4">
            Where is your business today?
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 font-normal">
            Pick the one that fits and we’ll show how we’d begin.
          </p>
        </div>

        {/* Interactive Content Switcher */}
        <AnimatePresence mode="wait">
          {selectedOption === null ? (
            /* Choice Cards View (Image 1) */
            <motion.div
              key="choices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              {/* Card 1: Launching New */}
              <button
                type="button"
                onClick={() => setSelectedOption('launch')}
                className="group text-left relative bg-[#141414] hover:bg-[#1a1a1a] text-white p-8 sm:p-10 lg:p-12 rounded-2xl border border-neutral-800 hover:border-primary transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-white group-hover:text-primary transition-colors duration-200">
                      I’m launching something new
                    </h3>
                    <span className="p-2.5 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-white text-white/60 transition-all duration-300 shrink-0">
                      <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
                    A new business, product or brand that needs to go to market.
                  </p>
                </div>
              </button>

              {/* Card 2: Already have a business */}
              <button
                type="button"
                onClick={() => setSelectedOption('grow')}
                className="group text-left relative bg-[#141414] hover:bg-[#1a1a1a] text-white p-8 sm:p-10 lg:p-12 rounded-2xl border border-neutral-800 hover:border-primary transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-white group-hover:text-primary transition-colors duration-200">
                      I already have a business
                    </h3>
                    <span className="p-2.5 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-white text-white/60 transition-all duration-300 shrink-0">
                      <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
                    Something that’s running and ready to grow or improve.
                  </p>
                </div>
              </button>
            </motion.div>
          ) : (
            /* Selected Roadmap View (Image 2 for Launch, Image 3 for Growth) */
            <motion.div
              key={selectedOption}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative bg-[#141414] text-white p-6 sm:p-10 lg:p-12 rounded-2xl border border-neutral-800 shadow-2xl"
            >
              {/* Header with Switcher Option */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-neutral-800/80">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-2">
                    {activeContent.heading}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-neutral-400">
                    {activeContent.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOption(selectedOption === 'launch' ? 'grow' : 'launch')}
                  className="inline-flex items-center gap-2 self-start sm:self-auto font-sans text-xs sm:text-sm text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-neutral-700/60 transition-colors cursor-pointer"
                >
                  <span>
                    Switch to: {selectedOption === 'launch' ? 'I already have a business' : 'I’m launching something new'}
                  </span>
                </button>
              </div>

              {/* 6 Step Cards in 4-column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
                {activeContent.steps.map((step, idx) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="bg-[#1f1f1f] p-6 sm:p-7 rounded-xl border border-neutral-800 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] hover:border-neutral-700 transition-colors"
                  >
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-3">
                      {step.number}
                    </span>
                    <p className="font-heading text-base sm:text-lg text-white font-normal leading-snug">
                      {step.title}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Action Area */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
                <Button
                  href="#contact"
                  variant="primary"
                  text="Book a discovery call"
                />
                <button
                  type="button"
                  onClick={() => setSelectedOption(null)}
                  className="font-sans text-base text-white/80 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Change my answer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default BusinessQuestions
