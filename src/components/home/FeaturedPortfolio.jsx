import { motion } from 'framer-motion'
import Button from '../ui/Button'

const projects = [
  {
    title: 'The Red Jacket',
    subtitle: 'Warmth that moves with you.',
    category: 'Branding',
    tag: '+ Marketing',
    image:
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Neurai AI Theme',
    subtitle: 'Strategy, execution, and metrics.',
    category: 'Web Design',
    tag: 'Development',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Social Media Impact',
    subtitle: 'Performance meets polish.',
    category: 'Photography',
    tag: 'Strategy',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Red Monochrome',
    subtitle: 'Ready for the unexpected.',
    category: 'Web Design',
    tag: 'Marketing',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Enrichen Finance Theme',
    subtitle: 'WordPress, HTML, and CSS',
    category: 'UI/UX Design',
    tag: 'Development',
    image:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Spark AI Theme',
    subtitle: 'Gear up and stand out.',
    category: 'UI/UX Design',
    tag: 'Development',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: '7Host Theme',
    subtitle: 'WordPress Development',
    category: 'Branding',
    tag: 'UI/UX Design',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
  },
]

const ProjectCard = ({ project, aspect = 'aspect-[16/11]' }) => (
  <motion.article
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
    className="group cursor-pointer flex flex-col w-full"
  >
    {/* Image Container with Square Corners, No Border & Hover Scale */}
    <div
      className={`relative ${aspect} w-full overflow-hidden bg-zinc-900 rounded-none transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
    </div>

    {/* Project Meta Details Below Image */}
    <div className="flex items-start justify-between gap-4 pt-3.5 sm:pt-4">
      <div>
        <h3 className="font-heading text-lg sm:text-xl font-normal text-white group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-white/50 mt-0.5">
          {project.subtitle}
        </p>
      </div>

      <div className="text-right flex flex-col items-end flex-shrink-0">
        <span className="font-sans text-xs text-white/60">
          {project.category}
        </span>
        {project.tag && (
          <span className="font-sans text-xs text-primary font-medium mt-0.5">
            {project.tag}
          </span>
        )}
      </div>
    </div>
  </motion.article>
)

const FeaturedPortfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative w-full bg-black text-white py-28 sm:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background Subtle Light Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Automatic Flowing Primary Color Wave on the Grid */}
      <motion.div
        animate={{
          x: ['-20%', '50%', '-20%'],
          y: ['-15%', '35%', '-15%'],
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-[900px] h-[900px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(199,0,37,0.3)_0%,rgba(199,0,37,0.08)_45%,transparent_70%)] blur-[90px]"
      />

      {/* Vignettes for Seamless Edge Fading */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: [ Featured Portfolio ] on Left, Heading on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-20 sm:mb-28 lg:mb-32">
          {/* Left: Tag */}
          <div className="lg:col-span-4">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-white/50 uppercase">
              [ featured portfolio ]
            </span>
          </div>

          {/* Right: Statement with Red Accent Bar */}
          <div className="lg:col-span-8 flex items-start gap-4 sm:gap-6">
            <span className="w-6 sm:w-10 h-0.5 bg-primary mt-3 sm:mt-4 flex-shrink-0" />
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.2] tracking-tight text-white">
              Small <span className="text-primary">improvements,</span> real results. <br />
              <span className="text-white/60 text-lg sm:text-2xl md:text-3xl block mt-2 font-light">
                Selected projects where understanding came first.
              </span>
            </h2>
          </div>
        </div>

        {/* Cluttered / Asymmetric Editorial Portfolio Grid */}
        
        {/* Row 1: Left Wide Card (7 cols) + Right Offset Card (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-28 lg:mb-36">
          <div className="lg:col-span-7">
            <ProjectCard project={projects[0]} aspect="aspect-[16/11]" />
          </div>
          <div className="lg:col-span-5 lg:pt-20">
            <ProjectCard project={projects[1]} aspect="aspect-[4/3]" />
          </div>
        </div>

        {/* Row 2: Prominent Centered Feature Card */}
        <div className="flex justify-center mb-20 sm:mb-28 lg:mb-36">
          <div className="w-full lg:w-8/12">
            <ProjectCard project={projects[2]} aspect="aspect-[16/10]" />
          </div>
        </div>

        {/* Row 3: Left Medium Card (5 cols) + Right Wide Offset Card (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-28 lg:mb-36">
          <div className="lg:col-span-5">
            <ProjectCard project={projects[3]} aspect="aspect-square" />
          </div>
          <div className="lg:col-span-7 lg:pt-16">
            <ProjectCard project={projects[4]} aspect="aspect-[16/11]" />
          </div>
        </div>

        {/* Row 4: Two Compact Cards Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-28">
          <div className="lg:col-span-5">
            <ProjectCard project={projects[5]} aspect="aspect-[4/3]" />
          </div>
          <div className="lg:col-span-5">
            <ProjectCard project={projects[6]} aspect="aspect-[4/3]" />
          </div>
        </div>

        {/* Bottom CTA Action */}
        <div className="mt-8 sm:mt-12 text-center">
          <Button
            href="#contact"
            variant="primary"
            text="Explore All Work"
          />
        </div>

      </div>
    </section>
  )
}

export default FeaturedPortfolio
