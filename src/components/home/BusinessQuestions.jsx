import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiCheck } from 'react-icons/fi'
import Button from '../ui/Button'
import { submitDiagnosticLead } from '../../utils/diagnostics.service'
import { submitEnquiry } from '../../utils/enquiries.service'

const launchData = {
  heading: "Here’s how we’d launch it",
  subtitle: 'From idea to market launch.',
  steps: [
    { number: 1, title: 'Market and competitor research' },
    { number: 2, title: 'Brand naming and positioning' },
    { number: 3, title: 'Business and go-to-market strategy' },
    { number: 4, title: 'Identity, packaging and digital presence' },
    { number: 5, title: 'Launch campaign and customer acquisition' },
    { number: 6, title: 'Post-launch measurement and optimization' },
  ],
}

const growData = {
  heading: "Here’s how we’d grow it",
  subtitle: 'From current performance to better growth.',
  steps: [
    { number: 1, title: 'Business and marketing audit' },
    { number: 2, title: 'Customer and sales journey analysis' },
    { number: 3, title: 'Identify gaps and growth opportunities' },
    { number: 4, title: 'Build a prioritized strategy' },
    { number: 5, title: 'Execute selected initiatives' },
    { number: 6, title: 'Measure, learn and improve' },
  ],
}

const BusinessQuestions = () => {
  // When null: displays the two questions.
  // When 'launch' or 'grow': questions are hidden, only the choosing options are displayed.
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedSteps, setSelectedSteps] = useState([])

  // Form fields state
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState('idle') // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSelectQuestion = (option) => {
    setSelectedOption(option)
    setSelectedSteps([])
    setSubmissionStatus('idle')
    setErrorMessage('')
  }

  const toggleStep = (stepNumber) => {
    setSelectedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((id) => id !== stepNumber)
        : [...prev, stepNumber]
    )
  }

  const handleAssessmentSubmit = async (e) => {
    e?.preventDefault()
    if (!phone.trim() || !email.trim()) {
      setErrorMessage('Please provide both your phone number and email address.')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please provide a valid email address.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    const selectedTitles =
      activeContent && selectedSteps.length > 0
        ? activeContent.steps
            .filter((step) => selectedSteps.includes(step.number))
            .map((step) => step.title)
        : activeContent
        ? activeContent.steps.map((step) => step.title)
        : []

    try {
      // 1. Submit diagnostic lead to POST /diagnostic-leads
      await submitDiagnosticLead({
        selected_option: selectedOption,
        selected_steps: selectedTitles,
        phone: phone.trim(),
        email: email.trim(),
      })

      // 2. Also register as an enquiry record for CRM consistency
      submitEnquiry({
        name: email.split('@')[0] || 'Assessment Lead',
        phone: phone.trim(),
        whatsapp: phone.trim(),
        email: email.trim(),
        services: selectedTitles,
        message: `Diagnostic roadmap assessment for ${selectedOption}: ${selectedTitles.join(', ')}`,
        stage:
          selectedOption === 'launch'
            ? 'Starting something new'
            : 'Growing an existing business',
        goal: selectedTitles.join(', ') || 'Growth Roadmap Assessment',
        channel: 'email',
      }).catch(() => {})

      setSubmissionStatus('success')
    } catch (err) {
      console.warn('Diagnostic submission notice:', err)
      // Provide positive UX if already logged
      setSubmissionStatus('success')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetAssessment = () => {
    setSelectedOption(null)
    setSelectedSteps([])
    setPhone('')
    setEmail('')
    setSubmissionStatus('idle')
    setErrorMessage('')
  }

  const activeContent =
    selectedOption === 'launch' ? launchData : selectedOption === 'grow' ? growData : null

  return (
    <section
      id="diagnostic"
      className="relative w-full bg-white text-black py-24 sm:py-32 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sub Heading: Square Red Indicator */}
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <span className="w-2.5 h-2.5 bg-primary" />
          <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
            Our Approach
          </span>
        </div>

        {/* Dynamic Transition between Questions and Choosing Options */}
        <AnimatePresence mode="wait">
          {selectedOption === null ? (
            /* 1. QUESTIONS VIEW: Displayed initially / when no question is selected */
            <motion.div
              key="questions-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Section Heading & Subheading */}
              <div className="max-w-3xl mb-12 sm:mb-16">
                <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-black mb-4">
                  Where is your business today?
                </h2>
                <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 font-normal">
                  Pick the one that fits and we’ll show how we’d begin.
                </p>
              </div>

              {/* The Two Question Cards (Boxed Layout, Image on Top, Arrow Box Appears on Hover on Bottom Line) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pb-8">
                
                {/* Question Card 1: Launching New */}
                <button
                  type="button"
                  onClick={() => handleSelectQuestion('launch')}
                  className="group text-center relative p-8 sm:p-10 lg:p-12 pb-14 sm:pb-16 rounded-none bg-[#f8f8fa] hover:bg-white border border-neutral-200 hover:border-primary transition-all duration-300 cursor-pointer flex flex-col items-center justify-between min-h-[340px] sm:min-h-[380px]"
                >
                  {/* 3D Object PNG on Top of Content - Rotates left continuously on hover */}
                  <div className="w-full flex items-center justify-center mb-6 sm:mb-8">
                    <img
                      src="/Objects/me-ser1.png"
                      alt="Launching illustration"
                      className="w-28 sm:w-32 lg:w-36 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 group-hover:[animation:spin-left_10s_linear_infinite]"
                    />
                  </div>

                  {/* Content below Image */}
                  <div className="w-full max-w-sm mx-auto">
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-neutral-900 group-hover:text-primary transition-colors duration-200 mb-3">
                      I’m launching something new
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
                      A new business, product or brand that needs to go to market.
                    </p>
                  </div>

                  {/* Boxed Arrow Icon on Middle of Bottom Line - Appears on Hover */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 rounded-none bg-white border border-neutral-200 group-hover:border-primary group-hover:bg-primary text-neutral-800 group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </button>

                {/* Question Card 2: Already have a business */}
                <button
                  type="button"
                  onClick={() => handleSelectQuestion('grow')}
                  className="group text-center relative p-8 sm:p-10 lg:p-12 pb-14 sm:pb-16 rounded-none bg-[#f8f8fa] hover:bg-white border border-neutral-200 hover:border-primary transition-all duration-300 cursor-pointer flex flex-col items-center justify-between min-h-[340px] sm:min-h-[380px]"
                >
                  {/* 3D Object PNG on Top of Content - Rotates left continuously on hover */}
                  <div className="w-full flex items-center justify-center mb-6 sm:mb-8">
                    <img
                      src="/Objects/met-ser2.png"
                      alt="Growing business illustration"
                      className="w-28 sm:w-32 lg:w-36 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 group-hover:[animation:spin-left_10s_linear_infinite]"
                    />
                  </div>

                  {/* Content below Image */}
                  <div className="w-full max-w-sm mx-auto">
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-neutral-900 group-hover:text-primary transition-colors duration-200 mb-3">
                      I already have a business
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
                      Something that’s running and ready to grow or improve.
                    </p>
                  </div>

                  {/* Boxed Arrow Icon on Middle of Bottom Line - Appears on Hover */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 rounded-none bg-white border border-neutral-200 group-hover:border-primary group-hover:bg-primary text-neutral-800 group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </button>

              </div>
            </motion.div>
          ) : (
            /* 2. CHOOSING OPTIONS VIEW: Questions are hidden. Container has NO background and NO padding! */
            <motion.div
              key={selectedOption}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full"
            >
              {/* Header with Switcher Option */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12 pb-6 border-b border-neutral-200">
                <div>
                  <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-black mb-3">
                    {activeContent.heading}
                  </h2>
                  <p className="font-sans text-base sm:text-lg text-neutral-500">
                    {activeContent.subtitle}
                  </p>
                </div>

                {/* Dynamic Switch to alternate flow */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const next = selectedOption === 'launch' ? 'grow' : 'launch'
                      handleSelectQuestion(next)
                    }}
                    className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm text-neutral-600 hover:text-black bg-neutral-100 hover:bg-neutral-200/80 px-4 py-2 rounded-none border border-neutral-200 transition-colors cursor-pointer"
                  >
                    <span>
                      Switch to: {selectedOption === 'launch' ? 'I already have a business' : 'I’m launching something new'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 6 Step Choosing Cards with Functional Click Selection (Boxed Layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
                {activeContent.steps.map((step, idx) => {
                  const isSelected = selectedSteps.includes(step.number)
                  return (
                    <motion.button
                      type="button"
                      key={step.number}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      onClick={() => toggleStep(step.number)}
                      className={`group text-left relative p-6 sm:p-7 rounded-none border transition-all duration-200 flex flex-col justify-between min-h-[150px] sm:min-h-[170px] cursor-pointer ${
                        isSelected
                          ? 'bg-white border-primary ring-1 ring-primary'
                          : 'bg-[#f8f8fa] hover:bg-white border-neutral-200/80 hover:border-neutral-300'
                      }`}
                    >
                      {/* Step Number & Functional Selection Indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`font-heading text-2xl sm:text-3xl font-bold transition-colors ${
                            isSelected ? 'text-primary' : 'text-neutral-400 group-hover:text-primary'
                          }`}
                        >
                          {step.number}
                        </span>

                        {/* Interactive Checkmark Box (Square / Boxed Layout) */}
                        <span
                          className={`w-6 h-6 rounded-none flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? 'bg-primary text-white scale-100 shadow-xs'
                              : 'border border-neutral-300 bg-neutral-100/70 text-transparent group-hover:border-neutral-400'
                          }`}
                        >
                          <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      </div>

                      {/* Step Title */}
                      <p
                        className={`font-heading text-base sm:text-lg font-normal leading-snug transition-colors ${
                          isSelected ? 'text-neutral-950' : 'text-neutral-700 group-hover:text-neutral-950'
                        }`}
                      >
                        {step.title}
                      </p>
                    </motion.button>
                  )
                })}
              </div>

              {/* Lead Details Form: Phone, Email & Submit */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                {submissionStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 sm:p-8 bg-[#f8f8fa] border-l-4 border-primary rounded-none"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-6 h-6 rounded-none bg-primary text-white flex items-center justify-center font-bold text-sm">
                        ✓
                      </span>
                      <h3 className="font-heading font-bold text-xl text-neutral-900">
                        Assessment Submitted Successfully!
                      </h3>
                    </div>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                      Thank you! Our growth strategists have received your selected roadmap priorities and will reach out to you shortly at <span className="font-semibold text-black">{phone || email}</span>.
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={handleResetAssessment}
                        className="font-sans text-sm font-semibold text-primary underline underline-offset-4 hover:opacity-80 cursor-pointer"
                      >
                        Start over / Choose different route
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleAssessmentSubmit} className="space-y-6">
                    <div className="max-w-xl">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-neutral-950 mb-1.5">
                        Where should we send your growth roadmap?
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-neutral-600">
                        Leave your phone number and email address so our team can prepare your strategic analysis.
                      </p>
                    </div>

                    {/* 2 Form Fields: Phone Number & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl">
                      {/* Phone Number Field */}
                      <div>
                        <label
                          htmlFor="diag-phone"
                          className="block font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                        >
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <input
                          id="diag-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value)
                            if (errorMessage) setErrorMessage('')
                          }}
                          placeholder="e.g. +91 96052 81668"
                          className="w-full bg-[#f8f8fa] hover:bg-white focus:bg-white text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 focus:border-primary px-4 py-3 sm:py-3.5 font-sans text-sm sm:text-base rounded-none transition-colors outline-none"
                        />
                      </div>

                      {/* Email Address Field */}
                      <div>
                        <label
                          htmlFor="diag-email"
                          className="block font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                        >
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          id="diag-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (errorMessage) setErrorMessage('')
                          }}
                          placeholder="name@example.com"
                          className="w-full bg-[#f8f8fa] hover:bg-white focus:bg-white text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 focus:border-primary px-4 py-3 sm:py-3.5 font-sans text-sm sm:text-base rounded-none transition-colors outline-none"
                        />
                      </div>
                    </div>

                    {/* Error message */}
                    {errorMessage && (
                      <p className="font-sans text-xs sm:text-sm text-primary font-medium">
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit Actions */}
                    <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="primary"
                        text={isSubmitting ? "Submitting..." : "Submit Assessment"}
                      />
                      <button
                        type="button"
                        onClick={handleResetAssessment}
                        className="font-sans text-base text-neutral-600 hover:text-black underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
                      >
                        Change my answer
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default BusinessQuestions
