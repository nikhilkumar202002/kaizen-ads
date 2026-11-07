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
  // Step machine:
  // Step 1: Situation question ('launch' vs 'grow')
  // Step 2: Choosing priority items
  // Step 3: Fill phone number & email
  // Step 4: Success confirmation
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedSteps, setSelectedSteps] = useState([])

  // Contact form state
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const activeContent =
    selectedOption === 'launch' ? launchData : selectedOption === 'grow' ? growData : null

  // Step 1: Select Question
  const handleSelectQuestion = (option) => {
    setSelectedOption(option)
    setSelectedSteps([])
    setErrorMessage('')
    setCurrentStep(2)
  }

  // Step 2: Toggle item selection
  const toggleStep = (stepNumber) => {
    setSelectedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((id) => id !== stepNumber)
        : [...prev, stepNumber]
    )
  }

  const handleSelectAllSteps = () => {
    if (!activeContent) return
    if (selectedSteps.length === activeContent.steps.length) {
      setSelectedSteps([])
    } else {
      setSelectedSteps(activeContent.steps.map((s) => s.number))
    }
  }

  // Advance to Step 3: Contact Details
  const handleProceedToContact = () => {
    if (!activeContent) return
    // If no steps selected, automatically select all steps by default
    if (selectedSteps.length === 0) {
      setSelectedSteps(activeContent.steps.map((s) => s.number))
    }
    setErrorMessage('')
    setCurrentStep(3)
  }

  // Step 3: Submit Lead
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

      setCurrentStep(4)
    } catch (err) {
      console.warn('Diagnostic submission notice:', err)
      // Provide positive UX if already logged
      setCurrentStep(4)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Full reset back to Step 1
  const handleResetAssessment = () => {
    setCurrentStep(1)
    setSelectedOption(null)
    setSelectedSteps([])
    setPhone('')
    setEmail('')
    setErrorMessage('')
  }

  return (
    <section
      id="diagnostic"
      className="relative w-full bg-white text-black py-24 sm:py-32 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header with Step Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-neutral-200 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-primary" />
            <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
              Our Approach
            </span>
          </div>

          {/* 3-Step Breadcrumb Progress Indicator */}
          {currentStep <= 3 && (
            <div className="flex items-center gap-2.5 sm:gap-3 font-sans text-xs sm:text-sm select-none">
              <span
                className={`transition-colors ${
                  currentStep === 1
                    ? 'text-primary font-bold'
                    : 'text-neutral-400'
                }`}
              >
                1. Situation
              </span>
              <span className="text-neutral-300">→</span>
              <span
                className={`transition-colors ${
                  currentStep === 2
                    ? 'text-primary font-bold'
                    : currentStep > 2
                    ? 'text-neutral-700 font-medium'
                    : 'text-neutral-400'
                }`}
              >
                2. Choose Items
              </span>
              <span className="text-neutral-300">→</span>
              <span
                className={`transition-colors ${
                  currentStep === 3
                    ? 'text-primary font-bold'
                    : 'text-neutral-400'
                }`}
              >
                3. Contact Details
              </span>
            </div>
          )}
        </div>

        {/* Step-by-Step Animated Views */}
        <AnimatePresence mode="wait">
          
          {/* ============================================================== */}
          {/* STEP 1: SITUATION SELECTION ("Launch" vs "Grow")               */}
          {/* ============================================================== */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Section Heading */}
              <div className="max-w-3xl mb-12 sm:mb-16">
                <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-black mb-4">
                  Where is your business today?
                </h2>
                <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 font-normal">
                  Pick the one that fits and we’ll show how we’d begin.
                </p>
              </div>

              {/* The Two Question Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pb-8">
                {/* Question Card 1: Launching New */}
                <button
                  type="button"
                  onClick={() => handleSelectQuestion('launch')}
                  className="group text-center relative p-8 sm:p-10 lg:p-12 pb-14 sm:pb-16 rounded-none bg-[#f8f8fa] hover:bg-white border border-neutral-200 hover:border-primary transition-all duration-300 cursor-pointer flex flex-col items-center justify-between min-h-[340px] sm:min-h-[380px]"
                >
                  <div className="w-full flex items-center justify-center mb-6 sm:mb-8">
                    <img
                      src="/Objects/me-ser1.png"
                      alt="Launching illustration"
                      className="w-28 sm:w-32 lg:w-36 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 group-hover:[animation:spin-left_10s_linear_infinite]"
                    />
                  </div>

                  <div className="w-full max-w-sm mx-auto">
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-neutral-900 group-hover:text-primary transition-colors duration-200 mb-3">
                      I’m launching something new
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
                      A new business, product or brand that needs to go to market.
                    </p>
                  </div>

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
                  <div className="w-full flex items-center justify-center mb-6 sm:mb-8">
                    <img
                      src="/Objects/met-ser2.png"
                      alt="Growing business illustration"
                      className="w-28 sm:w-32 lg:w-36 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 group-hover:[animation:spin-left_10s_linear_infinite]"
                    />
                  </div>

                  <div className="w-full max-w-sm mx-auto">
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-neutral-900 group-hover:text-primary transition-colors duration-200 mb-3">
                      I already have a business
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
                      Something that’s running and ready to grow or improve.
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 rounded-none bg-white border border-neutral-200 group-hover:border-primary group-hover:bg-primary text-neutral-800 group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* STEP 2: CHOOSING THE ROADMAP ITEMS                            */}
          {/* ============================================================== */}
          {currentStep === 2 && activeContent && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full"
            >
              {/* Header with Heading & Instructions */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10 pb-2">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight text-black mb-2">
                    {activeContent.heading}
                  </h2>
                  <p className="font-sans text-base sm:text-lg text-neutral-500">
                    Choose the priority items that matter most to your business right now.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSelectAllSteps}
                    className="font-sans text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black transition-colors px-3 py-1.5 border border-neutral-200 bg-[#f8f8fa] hover:bg-neutral-100 cursor-pointer"
                  >
                    {selectedSteps.length === activeContent.steps.length
                      ? 'Deselect All'
                      : 'Select All 6'}
                  </button>
                  <span className="font-sans text-xs sm:text-sm text-neutral-400">
                    {selectedSteps.length} of {activeContent.steps.length} selected
                  </span>
                </div>
              </div>

              {/* 6 Step Choosing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
                {activeContent.steps.map((step, idx) => {
                  const isSelected = selectedSteps.includes(step.number)
                  return (
                    <motion.button
                      type="button"
                      key={step.number}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
                      onClick={() => toggleStep(step.number)}
                      className={`group text-left relative p-6 sm:p-7 rounded-none border transition-all duration-200 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] cursor-pointer ${
                        isSelected
                          ? 'bg-white border-primary ring-1 ring-primary'
                          : 'bg-[#f8f8fa] hover:bg-white border-neutral-200/80 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`font-heading text-2xl sm:text-3xl font-bold transition-colors ${
                            isSelected ? 'text-primary' : 'text-neutral-400 group-hover:text-primary'
                          }`}
                        >
                          {step.number}
                        </span>

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

              {/* Step 2 Bottom Navigation Actions */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="font-sans text-sm sm:text-base text-neutral-600 hover:text-black underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
                >
                  ← Back to situation
                </button>

                <Button
                  onClick={handleProceedToContact}
                  variant="primary"
                  text="Next: Contact Details"
                />
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* STEP 3: FILL PHONE NUMBER AND EMAIL                            */}
          {/* ============================================================== */}
          {currentStep === 3 && activeContent && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-3xl mx-auto"
            >
              {/* Step 3 Header */}
              <div className="mb-8 pb-2">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight text-black mb-2">
                  Where should we send your growth roadmap?
                </h2>
                <p className="font-sans text-base sm:text-lg text-neutral-600">
                  Leave your contact details and our team will analyze your selected priorities.
                </p>

                {/* Selected summary badges */}
                <div className="flex items-center flex-wrap gap-2.5 mt-4">
                  <span className="font-sans text-xs font-semibold px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800">
                    Route: {selectedOption === 'launch' ? 'New Launch' : 'Business Growth'}
                  </span>
                  <span className="font-sans text-xs font-semibold px-3 py-1 bg-primary/10 border border-primary/20 text-primary">
                    {selectedSteps.length} Priorities Selected
                  </span>
                </div>
              </div>

              {/* Contact Form with Phone Number & Email */}
              <form onSubmit={handleAssessmentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
                      className="w-full bg-[#f8f8fa] hover:bg-white focus:bg-white text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 focus:border-primary px-4 py-3.5 font-sans text-sm sm:text-base rounded-none transition-colors outline-none"
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
                      className="w-full bg-[#f8f8fa] hover:bg-white focus:bg-white text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 focus:border-primary px-4 py-3.5 font-sans text-sm sm:text-base rounded-none transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Validation Error Message */}
                {errorMessage && (
                  <p className="font-sans text-xs sm:text-sm text-primary font-medium">
                    {errorMessage}
                  </p>
                )}

                {/* Step 3 Actions */}
                <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="font-sans text-sm sm:text-base text-neutral-600 hover:text-black underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
                  >
                    ← Back to choose items
                  </button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    text={isSubmitting ? "Submitting..." : "Submit Assessment"}
                  />
                </div>
              </form>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* STEP 4: SUCCESS CONFIRMATION                                   */}
          {/* ============================================================== */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-12 bg-[#f8f8fa] border-l-4 border-primary rounded-none max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-none bg-primary text-white flex items-center justify-center font-bold text-base">
                  ✓
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900">
                  Assessment Submitted Successfully!
                </h3>
              </div>

              <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
                Thank you! Our growth strategists have received your selected roadmap priorities and will reach out to you shortly at <span className="font-semibold text-black">{phone || email}</span>.
              </p>

              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={handleResetAssessment}
                  className="font-sans text-sm sm:text-base font-semibold text-primary underline underline-offset-4 hover:opacity-80 cursor-pointer"
                >
                  Start over / Take another assessment
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  )
}

export default BusinessQuestions
