import { motion } from 'framer-motion'

const clientSegments = [
  {
    title: 'Entrepreneurs',
    description: 'Launching new businesses or products.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2c-3 4-4 8-4 13h8c0-5-1-9-4-13z" />
        <path d="M8 15l-3 4v2h4l1-2" />
        <path d="M16 15l3 4v2h-4l-1-2" />
        <circle cx="12" cy="9" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Established businesses',
    description: 'Looking to strengthen their brands.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 9.5L12 4l9 5.5V20H3V9.5z" />
        <circle cx="9" cy="13" r="0.75" fill="currentColor" />
        <circle cx="12" cy="13" r="0.75" fill="currentColor" />
        <circle cx="15" cy="13" r="0.75" fill="currentColor" />
        <path d="M10 20v-4h4v4" />
      </svg>
    ),
  },
  {
    title: 'Teams needing structure',
    description: 'Seeking a more structured marketing strategy.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 11h6M9 15h4" />
      </svg>
    ),
  },
  {
    title: 'Growth-focused companies',
    description: 'Looking to improve lead generation and sales performance.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 3v18h18" />
        <path d="M7 14l5-5 4 4 5-6" />
      </svg>
    ),
  },
  {
    title: 'Brands needing a partner',
    description: 'A strategic partner to coordinate their marketing.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="8.5" cy="12" r="5" />
        <circle cx="15.5" cy="12" r="5" />
      </svg>
    ),
  },
]

const cardFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}

const WhoWeWork = () => {
  return (
    <section
      id="who-we-work-with"
      className="relative w-full bg-white text-black py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
            <span className="w-2.5 h-2.5 bg-primary" />
            <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
              Partnerships
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-black max-w-4xl">
            Who we work with
          </h2>
        </div>

        {/* 5-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-5">
          {clientSegments.map((segment, index) => (
            <motion.div
              key={segment.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardFadeUp}
              className="group bg-[#F8F7F4] hover:bg-[#F2F0EB] border border-neutral-200/80 hover:border-primary/40 rounded-[22px] p-6 sm:p-7 flex flex-col justify-between min-h-[260px] sm:min-h-[290px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Red Outline Icon inside subtle badge */}
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {segment.icon}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-[20px] text-black leading-snug tracking-tight mb-2 sm:mb-2.5">
                  {segment.title}
                </h3>
                <p className="font-sans text-neutral-600 text-sm sm:text-[14.5px] leading-relaxed">
                  {segment.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhoWeWork
