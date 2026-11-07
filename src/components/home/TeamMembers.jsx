import { useRef, useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

/**
 * Team members dataset.
 * Images use high-resolution portrait headshots from Unsplash.
 * You can replace these URLs with local images (e.g. in /public/Team/) later.
 */
const teamMembersData = [
  {
    id: 'team-01',
    name: 'Mohammad Midhlaj',
    designation: 'Founder and CEO',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'team-02',
    name: 'Aleena Sunil',
    designation: 'Social Media Manager',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'team-03',
    name: 'Keziah Jossy',
    designation: 'Sales Executive',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'team-04',
    name: 'Arshada K',
    designation: 'Project Coordinator',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'team-05',
    name: 'Muhammad Midlaj',
    designation: 'Graphic Designer',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80',
  },
]

/**
 * Reusable Team Member Portrait Card component with bottom linear gradient overlay
 */
export const TeamCard = ({ member, className = '' }) => {
  return (
    <div
      className={`group relative aspect-[3/4] bg-[#14120E] border border-white/10 hover:border-primary/60 rounded-none overflow-hidden transition-all duration-300 select-none ${className}`}
    >
      {/* Member Portrait Image */}
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out rounded-none pointer-events-none"
      />

      {/* Bottom Black Linear Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 via-40% to-transparent flex flex-col justify-end p-5 sm:p-6 transition-all duration-300">
        {/* Subtle red accent line on hover */}
        <div className="w-0 group-hover:w-8 h-[2px] bg-primary transition-all duration-300 mb-2" />

        {/* Member Name */}
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug group-hover:text-primary transition-colors duration-200">
          {member.name}
        </h3>

        {/* Member Designation */}
        <p className="font-sans text-xs sm:text-sm text-neutral-300 font-medium mt-1 leading-normal">
          {member.designation}
        </p>
      </div>
    </div>
  )
}

/**
 * TeamMembers section with horizontal sliding carousel
 */
const TeamMembers = ({ members = teamMembersData }) => {
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Track scroll position to toggle navigation buttons
  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
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
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkScroll, 350)
    }
  }

  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row: Section Heading & Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-2.5 h-2.5 bg-primary" />
              <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
                The Minds
              </span>
            </div>

            {/* Section Heading */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
              The people behind <br className="hidden sm:inline" />
              the process
            </h2>
          </div>

          {/* Carousel Next / Prev Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous team member"
              className="w-11 h-11 rounded-none border border-white/20 bg-[#14120E] text-white hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer shadow-md"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next team member"
              className="w-11 h-11 rounded-none border border-white/20 bg-[#14120E] text-white hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer shadow-md"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Sliding Carousel Track */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-5 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4 select-none"
        >
          {members.map((member) => (
            <div
              key={member.id}
              className="shrink-0 w-[270px] sm:w-[310px] lg:w-[330px]"
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TeamMembers
