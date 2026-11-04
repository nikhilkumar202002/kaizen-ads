const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-end"
      style={{ backgroundImage: "url('/Banner/hero-banner.webp')" }}
    >
      {/* Bottom Left Corner Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <h1 className="font-heading text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] tracking-tight drop-shadow-sm max-w-4xl">
          <span className="block">Growth comes from</span>
          <span className="block">doing the right things.</span>
        </h1>
      </div>
    </section>
  )
}

export default Hero
