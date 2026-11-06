import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const goals = [
  { id: 'all', label: 'Show everything' },
  { id: 'customers', label: 'Get more customers' },
  { id: 'brand', label: 'Build a brand' },
  { id: 'launch', label: 'Launch something new' },
  { id: 'content', label: 'Create content' },
  { id: 'website', label: 'Get a website' },
  { id: 'automate', label: 'Automate my marketing' },
  { id: 'plan', label: 'Make a plan first' },
]

const serviceGroupDefinitions = {
  strategy: {
    number: '01',
    title: 'Strategy & Consulting',
    tagline: 'Think before you execute.',
    description:
      'Available as a standalone consulting service or as the foundation of an ongoing engagement.',
  },
  branding: {
    number: '02',
    title: 'Branding & Design',
    tagline: 'Build a brand people recognize and trust.',
    description:
      'For new businesses launching a brand and established businesses ready to reposition or evolve.',
  },
  digital: {
    number: '03',
    title: 'Digital Marketing',
    tagline: 'Turn marketing activity into measurable business progress.',
    description:
      'The core ongoing service for brands that need consistent execution and performance improvement.',
  },
  video: {
    number: '04',
    title: 'Video & Creative Production',
    tagline: 'Bring the brand’s message to life.',
    description:
      'For brands that need professional creative assets for campaigns, social media and other channels.',
  },
  tech: {
    number: '05',
    title: 'Web & Technology',
    tagline: 'Build digital experiences that support business goals.',
    description:
      'Automation and AI services are offered where there is a clear, practical business use case.',
  },
}

// Master data for "Show everything" view
const foundationService = {
  tag: 'The foundation',
  title: 'Strategy & Consulting',
  tagline: 'Think before you execute.',
  description:
    'Available as a standalone consulting service or as the foundation of an ongoing engagement.',
  pills: [
    'Business Growth Strategy',
    'Go-to-Market Strategy',
    'Brand Strategy & Positioning',
    'Marketing Audits & Consulting',
    'Marketing Strategy',
    'Customer Journey & Sales Funnel Strategy',
    'Market & Competitor Research',
  ],
}

const serviceGroups = [
  {
    number: '02',
    title: 'Branding & Design',
    tagline: 'Build a brand people recognize and trust.',
    description:
      'For new businesses launching a brand and established businesses ready to reposition or evolve.',
    pills: [
      'Brand Naming & Brand Identity',
      'Brand Guidelines',
      'Logo Design',
      'Marketing & Communication Design',
      'Brand Positioning & Messaging',
      'Rebranding',
      'Packaging Design',
    ],
  },
  {
    number: '03',
    title: 'Digital Marketing',
    tagline: 'Turn marketing activity into measurable business progress.',
    description:
      'The core ongoing service for brands that need consistent execution and performance improvement.',
    pills: [
      'Social Media Marketing & Management',
      'Content Strategy & Content Marketing',
      'Performance Marketing (Meta & Google Ads)',
      'Lead Generation & Conversion Optimization',
      'SEO & Local SEO',
      'Campaign Planning & Management',
      'Personal Branding',
    ],
  },
  {
    number: '04',
    title: 'Video & Creative Production',
    tagline: 'Bring the brand’s message to life.',
    description:
      'For brands that need professional creative assets for campaigns, social media and other channels.',
    pills: [
      'Commercial & Conceptual Ads',
      'Product Photography & Shoots',
      'Corporate Films',
      'Brand Photography',
      'Promotional Videos',
      'Motion Graphics & Video Editing',
      'Reels & Short-Form Video',
    ],
  },
  {
    number: '05',
    title: 'Web & Technology',
    tagline: 'Build digital experiences that support business goals.',
    description:
      'Automation and AI services are offered where there is a clear, practical business use case.',
    pills: [
      'Website Design & Development',
      'Marketing Automation',
      'E-commerce Websites',
      'AI-Powered Marketing Solutions',
      'Landing Page Development',
      'Analytics & Tracking Setup',
      'Conversion-Focused Web Design',
    ],
  },
]

// Tab-specific filtered data matching uploaded designs exactly
const tabFilterData = {
  customers: {
    label: 'Get more customers',
    cards: [
      {
        groupId: 'strategy',
        pills: ['Customer Journey & Sales Funnel Strategy'],
      },
      {
        groupId: 'digital',
        pills: [
          'Social Media Marketing & Management',
          'Performance Marketing (Meta & Google Ads)',
          'Lead Generation & Conversion Optimization',
          'SEO & Local SEO',
          'Campaign Planning & Management',
        ],
      },
      {
        groupId: 'tech',
        pills: [
          'Landing Page Development',
          'Analytics & Tracking Setup',
          'Conversion-Focused Web Design',
        ],
      },
    ],
  },
  brand: {
    label: 'Build a brand',
    cards: [
      {
        groupId: 'strategy',
        pills: ['Brand Strategy & Positioning'],
      },
      {
        groupId: 'branding',
        pills: [
          'Brand Naming & Brand Identity',
          'Brand Guidelines',
          'Logo Design',
          'Marketing & Communication Design',
          'Brand Positioning & Messaging',
          'Rebranding',
          'Packaging Design',
        ],
      },
    ],
  },
  launch: {
    label: 'Launch something new',
    cards: [
      {
        groupId: 'strategy',
        pills: [
          'Business Growth Strategy',
          'Go-to-Market Strategy',
          'Market & Competitor Research',
        ],
      },
      {
        groupId: 'branding',
        pills: [
          'Brand Naming & Brand Identity',
          'Logo Design',
          'Packaging Design',
        ],
      },
      {
        groupId: 'digital',
        pills: ['Campaign Planning & Management'],
      },
      {
        groupId: 'video',
        pills: ['Promotional Videos'],
      },
      {
        groupId: 'tech',
        pills: [
          'Website Design & Development',
          'Landing Page Development',
        ],
      },
    ],
  },
  content: {
    label: 'Create content',
    cards: [
      {
        groupId: 'digital',
        pills: [
          'Social Media Marketing & Management',
          'Content Strategy & Content Marketing',
          'Personal Branding',
        ],
      },
      {
        groupId: 'video',
        pills: [
          'Commercial & Conceptual Ads',
          'Product Photography & Shoots',
          'Corporate Films',
          'Brand Photography',
          'Promotional Videos',
          'Motion Graphics & Video Editing',
          'Reels & Short-Form Video',
        ],
      },
    ],
  },
  website: {
    label: 'Get a website',
    cards: [
      {
        groupId: 'digital',
        pills: ['SEO & Local SEO'],
      },
      {
        groupId: 'tech',
        pills: [
          'Website Design & Development',
          'E-commerce Websites',
          'Landing Page Development',
          'Analytics & Tracking Setup',
          'Conversion-Focused Web Design',
        ],
      },
    ],
  },
  automate: {
    label: 'Automate my marketing',
    cards: [
      {
        groupId: 'digital',
        pills: ['Lead Generation & Conversion Optimization'],
      },
      {
        groupId: 'tech',
        pills: [
          'Marketing Automation',
          'AI-Powered Marketing Solutions',
          'Analytics & Tracking Setup',
        ],
      },
    ],
  },
  plan: {
    label: 'Make a plan first',
    cards: [
      {
        groupId: 'strategy',
        pills: [
          'Business Growth Strategy',
          'Go-to-Market Strategy',
          'Brand Strategy & Positioning',
          'Marketing Audits & Consulting',
          'Marketing Strategy',
          'Customer Journey & Sales Funnel Strategy',
          'Market & Competitor Research',
        ],
      },
    ],
  },
}

const ServiceGrid = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef(null)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkScroll, 350)
    }
  }

  const activeFilter = tabFilterData[activeTab]

  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Centered Section Header on 2 Lines */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
            <span className="block">What do you want</span>
            <span className="block">to achieve?</span>
          </h2>
        </div>

        {/* Sliding Carousel Category Tabs with Contextual Left/Right Overlay Arrows */}
        <div className="relative w-full">
          {/* Left Overlay Gradient & Arrow (Only displayed when elements exist to the left) */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pr-12 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-none border border-white/20 bg-black/95 text-white hover:border-primary hover:text-primary flex items-center justify-center transition-colors cursor-pointer pointer-events-auto shadow-xl"
                aria-label="Scroll left"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Horizontal Non-Wrapping Tabs Container (rounded-none) */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex items-center flex-nowrap overflow-x-auto no-scrollbar gap-2.5 sm:gap-3 py-2 scroll-smooth"
          >
            {goals.map((goal) => {
              const isActive = activeTab === goal.id
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setActiveTab(goal.id)}
                  className={`flex-shrink-0 font-sans text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-none select-none transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white border border-primary font-semibold shadow-md'
                      : 'bg-transparent text-white/85 hover:text-white border border-white/30 hover:border-white/70 font-medium'
                  }`}
                >
                  {goal.label}
                </button>
              )
            })}
          </div>

          {/* Right Overlay Gradient & Arrow (Only displayed when elements exist to the right) */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pl-12 bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none">
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-none border border-white/20 bg-black/95 text-white hover:border-primary hover:text-primary flex items-center justify-center transition-colors cursor-pointer pointer-events-auto shadow-xl"
                aria-label="Scroll right"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Subtitle when a specific goal tab is active */}
        {activeFilter && (
          <div className="pt-2">
            <p className="font-heading font-bold text-base sm:text-lg text-white tracking-tight">
              For &ldquo;{activeFilter.label}&rdquo;, we&rsquo;d usually look at:
            </p>
          </div>
        )}

        {/* Dynamic Service Cards with Animated Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6 lg:space-y-8"
          >
            {/* VIEW 1: "Show everything" */}
            {activeTab === 'all' && (
              <>
                {/* 01 Top Full-Width Foundation Card */}
                <div className="bg-[#F6F3EE] text-[#17140F] p-8 sm:p-10 lg:p-12 rounded-none border border-[#E5E1D8]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="lg:col-span-6 flex flex-col items-start">
                      <span className="font-sans font-semibold text-xs sm:text-sm tracking-wide text-primary uppercase mb-3">
                        {foundationService.tag}
                      </span>

                      <h3 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#17140F] tracking-tight leading-tight mb-4">
                        {foundationService.title}
                      </h3>

                      <p className="font-heading font-medium text-[#17140F] text-base sm:text-lg mb-2">
                        {foundationService.tagline}
                      </p>

                      <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
                        {foundationService.description}
                      </p>
                    </div>

                    {/* Right Pills (No curve radius) */}
                    <div className="lg:col-span-6 flex flex-wrap gap-2 sm:gap-2.5 justify-start lg:justify-end">
                      {foundationService.pills.map((pill) => (
                        <span
                          key={pill}
                          className="bg-white hover:bg-neutral-50 border border-[#D6CFC3] hover:border-primary text-[#17140F] font-sans text-xs sm:text-[13px] font-medium px-4 py-2 rounded-none transition-colors duration-200 select-none shadow-2xs"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 02 - 05 Grid Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {serviceGroups.map((group) => (
                    <div
                      key={group.title}
                      className="bg-[#14120E] border border-white/10 hover:border-white/20 p-8 sm:p-10 lg:p-12 rounded-none flex flex-col justify-between transition-colors duration-200"
                    >
                      {/* Header: Outlined Red Number & Titles */}
                      <div className="mb-8">
                        <span
                          className="font-heading font-extrabold text-3xl sm:text-4xl leading-none mb-4 block select-none"
                          style={{
                            WebkitTextStroke: '1.5px #E5314D',
                            color: 'transparent',
                          }}
                        >
                          {group.number}
                        </span>

                        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                          {group.title}
                        </h3>

                        <p className="font-sans font-medium text-white/90 text-sm sm:text-base mb-2">
                          {group.tagline}
                        </p>

                        <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                          {group.description}
                        </p>
                      </div>

                      {/* Pills Cloud (No curve radius) */}
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
                        {group.pills.map((pill) => (
                          <span
                            key={pill}
                            className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-primary/50 text-white/85 font-sans text-xs sm:text-[13px] px-3.5 py-1.5 rounded-none transition-colors duration-200 select-none"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* VIEW 2: Goal Filtered Cards (matching uploaded screenshots) */}
            {activeFilter && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {activeFilter.cards.map((card) => {
                  const group = serviceGroupDefinitions[card.groupId]
                  return (
                    <div
                      key={group.title}
                      className="bg-[#14120E] border border-white/10 hover:border-white/20 p-8 sm:p-10 lg:p-12 rounded-none flex flex-col justify-start transition-colors duration-200"
                    >
                      {/* Title & Tagline */}
                      <div className="mb-6">
                        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                          {group.title}
                        </h3>

                        <p className="font-sans font-medium text-white/90 text-sm sm:text-base">
                          {group.tagline}
                        </p>
                      </div>

                      {/* Filtered Subset of Pills (No curve radius) */}
                      <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {card.pills.map((pill) => (
                          <span
                            key={pill}
                            className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-primary/50 text-white/85 font-sans text-xs sm:text-[13px] px-3.5 py-1.5 rounded-none transition-colors duration-200 select-none"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Takeaway Note */}
        <div className="pt-2">
          <p className="font-sans text-neutral-400 text-sm sm:text-base">
            Not sure?{' '}
            <a href="#contact" className="text-white hover:text-primary underline underline-offset-4 transition-colors">
              Book a discovery call
            </a>{' '}
            and we&rsquo;ll tell you what makes sense, and what doesn&rsquo;t.
          </p>
        </div>

      </div>
    </section>
  )
}

export default ServiceGrid
