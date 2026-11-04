import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import Button from '../ui/Button'

const projects = [
  {
    title: 'Kozhikode Roasters',
    category: 'Brand Identity & Packaging',
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Aura Skincare',
    category: 'Digital Marketing & Growth',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Apex Logistics',
    category: 'Web Design & Technology',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Urban Spire',
    category: 'Creative Direction & Video',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Nura Wellness',
    category: 'Brand Strategy & Campaign',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Nova FinTech',
    category: 'UI/UX & Mobile Experience',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Malabar Heritage',
    category: 'Rebranding & Content Strategy',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Volt Mobility',
    category: 'Performance Marketing',
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Solace Living',
    category: 'E-Commerce & Digital Platform',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80',
  },
]

const FeaturedPortfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative w-full bg-black text-white py-28 sm:py-36 lg:py-40 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Center Aligned) */}
        <div className="text-center max-w-3xl mx-auto mb-[25px] sm:mb-[30px] lg:mb-[40px]">
          {/* Main Section Heading (2 lines, with 'improvements' highlighted in red) */}
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-white mb-4 sm:mb-6">
            <span className="block">
              Small <span className="text-primary">improvements,</span>
            </span>
            <span className="block">real results</span>
          </h2>

          {/* Section Description */}
         
        </div>

        {/* 9 Images Grid (3 x 3) with exact 20px spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: (index % 3) * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group relative aspect-square w-full overflow-hidden bg-zinc-900 border border-white/10 rounded-none cursor-pointer"
            >
              {/* Square Image with smooth zoom on hover */}
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom black gradient overlay revealed on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 lg:p-7">
                {/* Content placed on bottom-left corner */}
                <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-sans text-xs sm:text-sm text-primary uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-normal text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Arrow icon on top-right corner on hover */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA Action */}
        <div className="mt-16 sm:mt-20 text-center">
          <Button
            href="#contact"
            variant="outline"
            text="Explore All Work"
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedPortfolio
