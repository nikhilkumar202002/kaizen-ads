import Button from '../ui/Button'

const Hero = () => {
  const keywords = [
    'Understand',
    'Strategize',
    'Execute',
    'Measure',
    'Improve',
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

        {/* Bottom Section: Left (Description + CTAs) & Right (Keywords) */}
        <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Side: Description & Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-6">
            <p className="font-sans text-white/85 text-base sm:text-lg md:text-[18px] leading-relaxed max-w-xl">
              Kaizen Ads is a growth marketing partner. We learn your business first, build the strategy, then bring in only the services that strategy calls for.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-1">
              <Button
                href="#contact"
                variant="primary"
                text="Book a discovery call"
              />
              <Button
                href="#about"
                variant="outline"
                text="How we think"
              />
            </div>
          </div>

          {/* Right Side: Keywords */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start lg:items-end space-y-1.5 sm:space-y-2">
            {keywords.map((word) => (
              <span
                key={word}
                className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide transition-colors hover:text-primary cursor-default"
              >
                {word}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero
