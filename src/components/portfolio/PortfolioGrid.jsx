import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi'

const categories = [
  'All',
  'Branding',
  'Print media',
  'Packaging',
  'Social media creatives',
  'Campaigns',
]

const portfolioItems = [
  // --- Branding ---
  {
    id: 'b-01',
    title: 'Brand Visual Identity 01',
    category: 'Branding',
    image: '/Portfolio/01.jpg.jpeg',
  },
  {
    id: 'b-02',
    title: 'Brand Visual Identity 02',
    category: 'Branding',
    image: '/Portfolio/02.jpg.jpeg',
  },
  {
    id: 'b-03',
    title: 'Brand Visual Identity 03',
    category: 'Branding',
    image: '/Portfolio/03.jpg.jpeg',
  },

  // --- Packaging ---
  {
    id: 'pkg-01',
    title: "Crunchy's Gourmet Pouch",
    category: 'Packaging',
    image: "/Portfolio/Crunchy's_01.jpg.jpeg",
  },
  {
    id: 'pkg-02',
    title: "Crunchy's Retail Box Packaging",
    category: 'Packaging',
    image: "/Portfolio/Crunchy's_02.jpg.jpeg",
  },
  {
    id: 'pkg-03',
    title: "Crunchy's Product Suite",
    category: 'Packaging',
    image: "/Portfolio/Crunchy's_03.jpg.jpeg",
  },

  // --- Print media ---
  {
    id: 'prt-01',
    title: 'Large Format Outdoor Billboard',
    category: 'Print media',
    image: '/Portfolio/IMG-20251219-WA0000.jpg.jpeg',
  },
  {
    id: 'prt-02',
    title: 'High-Impact Print Campaign',
    category: 'Print media',
    image: '/Portfolio/IMG-20251219-WA0001.jpg.jpeg',
  },

  // --- Social media creatives ---
  {
    id: 'sm-01',
    title: 'Editorial Social Ad Campaign',
    category: 'Social media creatives',
    image: '/Portfolio/IMG-20250717-WA0019.jpg.jpeg',
  },
  {
    id: 'sm-02',
    title: 'Engagement Grid Creative',
    category: 'Social media creatives',
    image: '/Portfolio/IMG-20250717-WA0020.jpg.jpeg',
  },
  {
    id: 'sm-03',
    title: 'Story Format Social Creative',
    category: 'Social media creatives',
    image: '/Portfolio/IMG-20250814-WA0063.jpg.jpeg',
  },
  {
    id: 'sm-04',
    title: 'Performance Marketing Ad Creative',
    category: 'Social media creatives',
    image: '/Portfolio/IMG-20260107-WA0084.jpg.jpeg',
  },
  {
    id: 'sm-05',
    title: 'Social Launch Announcement',
    category: 'Social media creatives',
    image: '/Portfolio/IMG-20260107-WA0086.jpg.jpeg',
  },

  // --- Campaigns ---
  {
    id: 'cmp-01',
    title: 'Omnichannel Growth Campaign',
    category: 'Campaigns',
    image: '/Portfolio/IMG-20250911-WA0005.jpg.jpeg',
  },
  {
    id: 'cmp-02',
    title: 'Seasonal Commercial Campaign',
    category: 'Campaigns',
    image: '/Portfolio/IMG-20250911-WA0006.jpg.jpeg',
  },
  {
    id: 'cmp-03',
    title: 'Brand Awareness Campaign 01',
    category: 'Campaigns',
    image: '/Portfolio/IMG-20260312-WA0168.jpg.jpeg',
  },
  {
    id: 'cmp-04',
    title: 'Brand Awareness Campaign 02',
    category: 'Campaigns',
    image: '/Portfolio/IMG-20260312-WA0169.jpg.jpeg',
  },
  {
    id: 'cmp-05',
    title: 'Brand Awareness Campaign 03',
    category: 'Campaigns',
    image: '/Portfolio/IMG-20260312-WA0170.jpg.jpeg',
  },
]

const PortfolioGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return portfolioItems
    return portfolioItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  // Open Lightbox with active index
  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  // Close Lightbox
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  // Next image in lightbox
  const showNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
    }
  }, [lightboxIndex, filteredItems.length])

  // Previous image in lightbox
  const showPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
      )
    }
  }, [lightboxIndex, filteredItems.length])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, showNext, showPrev])

  return (
    <section className="relative w-full bg-black text-white py-16 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Tabs Header (Zero border radius) */}
        <div className="flex items-center justify-center mb-12 sm:mb-16">
          <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-2.5 p-1.5 border border-white/10 bg-[#14120E] rounded-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat)
                    setLightboxIndex(null)
                  }}
                  className={`px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-none font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3-Column Masonry Grid (Zero border radius) */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 lg:gap-8 space-y-5 sm:space-y-6 lg:space-y-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden bg-[#14120E] border border-white/10 hover:border-primary/60 transition-all duration-300 cursor-pointer block rounded-none break-inside-avoid"
              >
                {/* Natural Aspect Ratio Masonry Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-none select-none block"
                />

                {/* Dark Hover Overlay with Category & Expand Icon (rounded-none) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 rounded-none">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-heading text-xs font-semibold uppercase tracking-wider text-primary bg-black/80 px-2.5 py-1 rounded-none border border-white/10">
                      {item.category}
                    </span>
                    <span className="w-8 h-8 rounded-none bg-primary text-white flex items-center justify-center shrink-0">
                      <FiMaximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state safeguard */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-neutral-400 font-sans">
            No portfolio items found for this category.
          </div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL (Zero border radius) --- */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Bar: Counter & Close Button (rounded-none) */}
            <div
              className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-50 pointer-events-none"
            >
              <div className="pointer-events-auto bg-black/80 border border-white/15 px-4 py-2 rounded-none text-xs sm:text-sm font-sans text-white/90">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="pointer-events-auto w-11 h-11 rounded-none bg-black/80 hover:bg-primary border border-white/20 hover:border-primary text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Left Previous Button (rounded-none) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showPrev()
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-none bg-black/80 hover:bg-primary border border-white/20 hover:border-primary text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* Lightbox Image & Info Container (rounded-none) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center select-none"
            >
              <motion.img
                key={filteredItems[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] max-w-[90vw] sm:max-w-[85vw] object-contain shadow-2xl rounded-none"
              />

              <div className="mt-4 text-center">
                <span className="font-heading text-xs font-semibold uppercase tracking-wider text-primary">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="font-heading font-bold text-lg sm:text-xl text-white mt-1">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
            </div>

            {/* Right Next Button (rounded-none) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showNext()
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-none bg-black/80 hover:bg-primary border border-white/20 hover:border-primary text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PortfolioGrid

