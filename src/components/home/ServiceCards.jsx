import { motion } from 'framer-motion'
import Button from '../ui/Button'

const services = [
  {
    name: 'Branding & Identity',
    description:
      'Transforming market perception with enduring visual systems, sharp brand positioning, and clear design guidelines.',
    keywords: ['Brand Identity', 'Positioning', 'Design Systems', 'Guidelines'],
    image:
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1000&auto=format&fit=crop&q=80',
  },
  {
    name: 'Growth & Performance',
    description:
      'Data-driven acquisition funnels, targeted media buying, and analytics engineered to scale revenue predictably.',
    keywords: ['Paid Media', 'Growth Funnels', 'Meta & Google Ads', 'CRO Analytics'],
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80',
  },
  {
    name: 'Web & Digital Platforms',
    description:
      'Fast, high-converting digital platforms crafted with modern aesthetic hierarchy, fluid motion, and flawless code.',
    keywords: ['UI/UX Design', 'Custom Web', 'E-Commerce', 'Web Performance'],
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
  },
  {
    name: 'Creative Direction & Content',
    description:
      'Compelling campaign storytelling, commercial video production, and high-impact creative that commands attention.',
    keywords: ['Commercial Video', 'Art Direction', 'Campaign Creative', 'Copywriting'],
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000&auto=format&fit=crop&q=80',
  },
]

const ServiceCards = () => {
  return (
    <section
      id="services"
      className="relative mx-0 sm:mx-6 lg:mx-[50px] bg-cover bg-center bg-no-repeat text-white py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundImage: "url('/Banner/service-section-background.jpg')" }}
    >
      {/* 50% Black Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left-Aligned Section Heading */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-white">
            <span className="block">Everything your growth</span>
            <span className="block">
              <span className="text-primary">strategy</span> calls for.
            </span>
          </h2>
        </div>

        {/* 4 Cards on 4 Columns with 3:4 Aspect Ratio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group relative aspect-[3/4] w-full overflow-hidden bg-zinc-950/80 backdrop-blur-sm rounded-none cursor-pointer flex flex-col justify-between p-6 sm:p-7"
            >
              {/* Background Image (Reveals & zooms on hover) */}
              <img
                src={service.image}
                alt={service.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
              />

              {/* Dark Gradient Overlay for optimal contrast on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Area: Service Name */}
              <div className="relative z-10 flex flex-col pt-1">
                <h3 className="font-heading text-xl sm:text-2xl font-normal text-white group-hover:text-white transition-colors duration-200">
                  {service.name}
                </h3>
              </div>

              {/* Middle Area: Keywords (Display on hover) */}
              <div className="relative z-10 my-auto py-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex flex-wrap gap-1.5 sm:gap-2">
                {service.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="font-sans text-[11px] sm:text-xs text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-none"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Bottom Area: Description */}
              <div className="relative z-10 pt-4">
                <p className="font-sans text-xs sm:text-sm text-white/65 group-hover:text-white/85 leading-relaxed transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA Action - Centered with 40px top margin */}
        <div className="mt-[50px] text-center">
          <Button
            href="#contact"
            variant="primary"
            text="Explore All Services"
          />
        </div>

      </div>
    </section>
  )
}

export default ServiceCards
