const COPY = {
  sectionHeading: 'What does Kaizen mean?',
  introText: 'Kaizen (改善) is a Japanese philosophy centred on continuous improvement.',
  disconnectedCard: {
    heading: 'Disconnected activities',
    text: "What we don't do. We don't treat marketing as a collection of disconnected activities.",
  },
  vsBadge: 'vs',
  continuousCard: {
    heading: 'Continuous improvement',
    text: 'We see marketing as a process of learning, testing, improving, and building sustainable growth over time.',
    kanji: '改善',
    svgAriaLabel: 'A connected loop of five steps',
  },
  approachText: "At Kaizen Ads, it shapes how we approach marketing: understand what works, identify what doesn't, make informed improvements, and keep moving forward.",
  pillBand: {
    ariaLabel: 'Understand. Strategize. Execute. Measure. Improve.',
    steps: ['Understand', 'Strategize', 'Execute', 'Measure', 'Improve'],
  },
}

const KaizenVs = () => {
  return (
    <section
      aria-labelledby="kaizen-vs-heading"
      className="w-full bg-black py-[150px] text-white transition-colors duration-200"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="kaizen-vs-heading"
            className="font-heading font-[800] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white"
          >
            {COPY.sectionHeading}
          </h2>
          <p className="font-sans text-neutral-400 text-base sm:text-lg md:text-xl mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            {COPY.introText}
          </p>
        </div>

        {/* 2. Before-and-After Row: Three-Column Grid */}
        <div className="grid grid-cols-1 min-[820px]:grid-cols-[1fr_auto_1fr] items-stretch gap-6 min-[820px]:gap-4 lg:gap-6">
          
          {/* Left Card: Disconnected activities */}
          <div className="bg-[#14120E] rounded-[24px] p-[28px] border-2 border-dashed border-[#363027] hover:border-white/20 flex flex-col justify-between h-full transition-colors duration-200">
            <div className="w-full flex items-center justify-center py-4 mb-4">
              <svg
                width="300"
                height="220"
                viewBox="0 0 300 220"
                aria-hidden="true"
                role="presentation"
                className="w-[300px] h-[220px] max-w-full overflow-visible"
              >
                {/* 7 scattered grey circles with ~55% opacity, radius 6-10 */}
                <circle cx="58" cy="55" r="7" fill="#A59E90" opacity="0.55" />
                <circle cx="115" cy="155" r="10" fill="#A59E90" opacity="0.55" />
                <circle cx="70" cy="180" r="6" fill="#A59E90" opacity="0.55" />
                <circle cx="155" cy="60" r="9" fill="#A59E90" opacity="0.55" />
                <circle cx="230" cy="50" r="8" fill="#A59E90" opacity="0.55" />
                <circle cx="205" cy="135" r="10" fill="#A59E90" opacity="0.55" />
                <circle cx="255" cy="175" r="7" fill="#A59E90" opacity="0.55" />

                {/* 3 short broken dotted lines (strokeDasharray="2 9", round caps) that do NOT connect circles */}
                <line
                  x1="82"
                  y1="100"
                  x2="132"
                  y2="108"
                  stroke="#A59E90"
                  strokeWidth="2.5"
                  strokeDasharray="2 9"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <line
                  x1="168"
                  y1="165"
                  x2="208"
                  y2="180"
                  stroke="#A59E90"
                  strokeWidth="2.5"
                  strokeDasharray="2 9"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <line
                  x1="175"
                  y1="95"
                  x2="195"
                  y2="68"
                  stroke="#A59E90"
                  strokeWidth="2.5"
                  strokeDasharray="2 9"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </div>

            <div className="mt-2">
              <h3 className="font-heading font-[800] text-xl sm:text-2xl tracking-tight text-white mb-2">
                {COPY.disconnectedCard.heading}
              </h3>
              <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed">
                {COPY.disconnectedCard.text}
              </p>
            </div>
          </div>

          {/* Centre Badge: 52px circle, 2px red border, red text "vs" */}
          <div className="flex items-center justify-center py-1 min-[820px]:py-0 min-[820px]:self-center">
            <div
              className="w-[52px] h-[52px] rounded-full border-2 border-brand-red flex items-center justify-center bg-[#14120E] shadow-sm flex-shrink-0 z-10"
              aria-hidden="true"
            >
              <span className="font-heading font-[800] text-brand-red text-base leading-none select-none">
                {COPY.vsBadge}
              </span>
            </div>
          </div>

          {/* Right Card: Continuous improvement */}
          <div className="bg-[#1A1712] text-white rounded-[24px] p-[28px] border border-white/10 hover:border-brand-red/40 flex flex-col justify-between h-full shadow-xl transition-colors duration-200">
            <div className="w-full flex items-center justify-center py-4 mb-4">
              <svg
                width="300"
                height="220"
                viewBox="0 0 300 220"
                role="img"
                aria-label={COPY.continuousCard.svgAriaLabel}
                className="w-[300px] h-[220px] max-w-full overflow-visible"
              >
                {/* 1. Faint red circle ring (r=78, 25% opacity) */}
                <circle
                  cx="150"
                  cy="110"
                  r="78"
                  fill="none"
                  stroke="var(--color-brand-red, #E5314D)"
                  strokeWidth="2.5"
                  opacity="0.25"
                />

                {/* 2. Rotating arc with strokeDasharray="40 450", round caps (8s linear infinite) */}
                <circle
                  cx="150"
                  cy="110"
                  r="78"
                  fill="none"
                  stroke="var(--color-brand-red, #E5314D)"
                  strokeWidth="3.5"
                  strokeDasharray="40 450"
                  strokeLinecap="round"
                  className="animate-spin-slow motion-reduce:animate-none"
                  style={{ transformOrigin: '150px 110px' }}
                />

                {/* 3. Five solid red nodes (r=10) evenly spaced on the ring */}
                <circle cx="150" cy="32" r="10" fill="var(--color-brand-red, #E5314D)" />
                <circle cx="224.2" cy="85.9" r="10" fill="var(--color-brand-red, #E5314D)" />
                <circle cx="195.8" cy="173.1" r="10" fill="var(--color-brand-red, #E5314D)" />
                <circle cx="104.2" cy="173.1" r="10" fill="var(--color-brand-red, #E5314D)" />
                <circle cx="75.8" cy="85.9" r="10" fill="var(--color-brand-red, #E5314D)" />

                {/* 4. The text 改善 in the centre in Bricolage Grotesque, 40px, 800 weight */}
                <text
                  x="150"
                  y="110"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-kanji font-[800] text-[40px] select-none fill-white"
                >
                  {COPY.continuousCard.kanji}
                </text>
              </svg>
            </div>

            <div className="mt-2">
              <h3 className="font-heading font-[800] text-xl sm:text-2xl tracking-tight text-white mb-2">
                {COPY.continuousCard.heading}
              </h3>
              <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
                {COPY.continuousCard.text}
              </p>
            </div>
          </div>

        </div>

        {/* 3. Below the row: Approach paragraph (max-width 60ch) */}
        <p className="max-w-[60ch] font-sans text-neutral-400 text-base sm:text-lg leading-relaxed text-center mx-auto mt-12 sm:mt-14">
          {COPY.approachText}
        </p>

        {/* 4. Dark pill band (22px radius, ink background, light text, Bricolage Grotesque 700) */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <div
            role="region"
            aria-label={COPY.pillBand.ariaLabel}
            className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[22px] bg-[#14120E] border border-white/15 text-white shadow-md max-w-full"
          >
            {COPY.pillBand.steps.map((step, index) => (
              <span key={step} className="inline-flex items-center gap-2.5 sm:gap-4">
                <span className="font-heading font-[700] text-sm sm:text-base tracking-tight whitespace-nowrap">
                  {step}
                </span>
                {index < COPY.pillBand.steps.length - 1 && (
                  <span
                    className="text-brand-red font-bold text-base sm:text-lg select-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default KaizenVs
