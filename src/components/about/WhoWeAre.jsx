import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const paragraphs = [
  'Kaizen Ads is a growth marketing partner helping businesses build stronger brands, reach the right customers, and turn marketing efforts into measurable business outcomes.',
  'We bring strategy, branding, digital marketing, creative production, and technology together under one approach: understand the business first, identify what needs to change, and execute what makes the most sense for its growth.',
  'Whatever the starting point, we work with you to identify the opportunities, build a clear plan, and put that plan into action.',
]

// Precompute cumulative character offsets for each word across all paragraphs
let runningOffset = 0
const paragraphsData = paragraphs.map((para) => {
  const words = para.split(' ')
  return words.map((word) => {
    const offset = runningOffset
    runningOffset += word.length
    return { word, charOffset: offset }
  })
})
const totalCharacters = runningOffset

const Character = ({ char, progress, range }) => {
  const color = useTransform(
    progress,
    range,
    ['#d1d5db', '#000000'] // Smooth transition from light grey to black
  )

  return (
    <motion.span style={{ color }} className="inline">
      {char}
    </motion.span>
  )
}

const Word = ({ word, progress, charOffset }) => {
  const chars = word.split('')

  return (
    <span className="inline-block whitespace-nowrap mr-[0.3em]">
      {chars.map((char, i) => {
        const globalCharIndex = charOffset + i
        const start = globalCharIndex / totalCharacters
        const end = (globalCharIndex + 1) / totalCharacters

        return (
          <Character
            key={i}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        )
      })}
    </span>
  )
}

const WhoWeAre = () => {
  const containerRef = useRef(null)

  // Track scroll through the Who We Are section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  })

  return (
    <section
      id="who-we-are"
      ref={containerRef}
      className="relative w-full bg-white text-black py-24 sm:py-32 lg:py-44 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub Heading: Who We Are */}
        <div className="flex items-center gap-2.5 mb-8 sm:mb-12">
          <span className="w-2.5 h-2.5 bg-primary" />
          <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
            Who we are
          </span>
        </div>

        {/* Multi-paragraph content with scroll-fill letter reveal */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12 max-w-6xl">
          {paragraphsData.map((words, pIndex) => (
            <p
              key={pIndex}
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.3] tracking-tight text-black"
            >
              {words.map(({ word, charOffset }, wIndex) => (
                <Word
                  key={wIndex}
                  word={word}
                  progress={scrollYProgress}
                  charOffset={charOffset}
                />
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
