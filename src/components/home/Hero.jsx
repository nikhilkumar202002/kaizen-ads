const Hero = () => {
  const steps = [
    { num: '//01', label: 'Understand' },
    { num: '//02', label: 'Strategize' },
    { num: '//03', label: 'Execute' },
    { num: '//04', label: 'Measure' },
    { num: '//05', label: 'Improve' },
  ]

  return (
    <section
      className="relative w-full min-h-screen lg:h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{ backgroundImage: "url('/Banner/hero-banner.webp')" }}
    >
      {/* Main Container Aligned with Header Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 lg:pb-14 flex-1">
        
        {/* Main Heading (Top) */}
        <div className="pt-2 sm:pt-4">
          <h1 className="font-heading text-white text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] font-normal leading-[1.02] tracking-tight drop-shadow-sm max-w-4xl">
            <span className="block">Growth comes</span>
            <span className="block">from doing the</span>
            <span className="block">right things.</span>
          </h1>
        </div>

        {/* Bottom Section: Left Description + Right Connected Keywords */}
        <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Side: Description */}
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="font-sans text-white/85 text-base sm:text-lg md:text-[18px] leading-relaxed max-w-xl">
              Kaizen Ads is a growth marketing partner. We learn your business first, build the strategy, then bring in only the services that strategy calls for.
            </p>
          </div>

          {/* Right Side: Keywords with connecting lines */}
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8 flex flex-col space-y-2 sm:space-y-2.5">
            {steps.map((item) => (
              <div
                key={item.num}
                className="flex items-center gap-3 sm:gap-4 py-0.5 sm:py-1 group"
              >
                {/* Number Prefix */}
                <span className="text-white/50 text-xs sm:text-sm font-mono tracking-wider transition-colors group-hover:text-white">
                  {item.num}
                </span>

                {/* Thin Horizontal Connecting Line */}
                <span className="flex-1 h-px bg-white/20 transition-colors group-hover:bg-white/40" />

                {/* Keyword Label */}
                <span className="text-white text-sm sm:text-base font-normal tracking-wide whitespace-nowrap transition-colors group-hover:text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero
