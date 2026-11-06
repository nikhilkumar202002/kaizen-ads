import { motion } from 'framer-motion'

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

const ServiceGrid = () => {
  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-8">
        
        {/* 01 Top Full-Width Foundation Card (No curve radius) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#F6F3EE] text-[#17140F] p-8 sm:p-10 lg:p-12 rounded-none border border-[#E5E1D8]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="font-sans font-semibold text-xs sm:text-sm tracking-wide text-primary uppercase mb-3">
                {foundationService.tag}
              </span>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#17140F] tracking-tight leading-tight mb-4">
                {foundationService.title}
              </h2>

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
        </motion.div>

        {/* 02 - 05 Bottom 2x2 Grid (No curve radius) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {serviceGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServiceGrid
