import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const paragraph =
  'Kaizen Ads is a growth marketing partner based in Kozhikode, Kerala. We learn your business first, build the strategy, then bring together the right branding, digital marketing, creative and technology services to put it into action.'

const words = paragraph.split(' ')
const totalCharacters = words.reduce((acc, word) => acc + word.length, 0)

// Precompute cumulative character offsets for each word
let runningOffset = 0
const wordOffsets = words.map((word) => {
  const offset = runningOffset
  runningOffset += word.length
  return offset
})

const Character = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1])
  const color = useTransform(
    progress,
    range,
    ['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 1)']
  )

  return (
    <motion.span style={{ opacity, color }} className="inline">
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

const About = () => {
  const containerRef = useRef(null)

  // Track scroll through the About section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  })

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-white text-black py-28 sm:py-36 lg:py-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub Heading: About Us */}
        <div className="flex items-center gap-2.5 mb-8 sm:mb-12">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
            About Us
          </span>
        </div>

        {/* Main Content with Scroll-Fill Letter Reveal on White Background */}
        <p className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-normal leading-[1.28] tracking-tight max-w-6xl text-black">
          {words.map((word, index) => (
            <Word
              key={index}
              word={word}
              progress={scrollYProgress}
              charOffset={wordOffsets[index]}
            />
          ))}
        </p>
      </div>
    </section>
  )
}

export default About
