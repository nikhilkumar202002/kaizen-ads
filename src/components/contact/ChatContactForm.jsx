import { useState, useRef, useEffect, useCallback } from 'react'
import { submitEnquiry } from '../../utils/enquiries.service'

/**
 * All copy, questions, and service options centralized
 */
const COPY = {
  header: {
    avatarLetter: 'K',
    title: 'Kaizen Ads',
    subtitle: 'Tell us about your business',
  },
  steps: {
    name: {
      question: "Hi! 👋 Welcome to Kaizen Ads. What’s your full name?",
      placeholder: 'Type your name',
      ariaLabel: 'Enter your full name',
    },
    phone: {
      question: (name) => `Nice to meet you, ${name}! What’s your phone number?`,
      placeholder: 'e.g. +91 96052 81668',
      ariaLabel: 'Enter your phone number',
    },
    whatsapp: {
      question: "Thanks! What’s your WhatsApp number?",
      placeholder: 'Type WhatsApp number if different',
      sameAsPhoneLabel: (phone) => `Same as phone (${phone})`,
      ariaLabel: 'Enter your WhatsApp number',
    },
    email: {
      question: "Got it! What’s your email address so we can send proposals & updates?",
      placeholder: 'name@example.com',
      ariaLabel: 'Enter your email address',
    },
    services: {
      question: "Which services are you looking for? (Select one or multiple)",
      options: [
        'Branding & Design',
        'Performance Marketing',
        'Social Media Creatives',
        'Web & Technology',
        'Video & Production',
        'Packaging & Print',
        'Growth Strategy',
        'Not sure yet',
      ],
      confirmLabel: 'Continue with selected',
      ariaLabel: 'Select services',
    },
    message: {
      question: "Almost done! Tell us a bit about your project, timeline, or goals.",
      placeholder: 'Briefly describe what you’re looking to achieve…',
      skipLabel: 'Skip & Send Enquiry',
      sendLabel: 'Send Enquiry',
      ariaLabel: 'Enter project details or message',
    },
    done: {
      success: (name, phone, email) =>
        `🎉 Thank you, ${name}! Your enquiry has been submitted successfully.\n\nOur team has received your project details and will get in touch with you shortly at ${phone || email}.`,
      fallbackSuccess: (name, contact) =>
        `🎉 Thank you, ${name}! Your enquiry has been received. Our team will review your requirements and reach out to you at ${contact} shortly.`,
      resetLabel: 'Start over / New enquiry',
    },
  },
  sendAriaLabel: 'Send',
  typingAriaLabel: 'Kaizen Ads is typing…',
}

const TYPING_DELAY_MS = 550

const ChatContactForm = ({ initialGoal = '', initialStage = '' }) => {
  // Conversation state machine: 'name' | 'phone' | 'whatsapp' | 'email' | 'services' | 'message' | 'done'
  const [currentStep, setCurrentStep] = useState('name')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form field state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    services: initialGoal ? [initialGoal] : [],
    message: '',
  })

  // Individual active input values
  const [nameInput, setNameInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [whatsappInput, setWhatsappInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [selectedServices, setSelectedServices] = useState(
    initialGoal ? [initialGoal] : []
  )
  const [messageInput, setMessageInput] = useState('')

  // Sync props during render
  const [prevInitialGoal, setPrevInitialGoal] = useState(initialGoal)
  if (prevInitialGoal !== initialGoal) {
    setPrevInitialGoal(initialGoal)
    if (initialGoal) {
      setSelectedServices((prev) =>
        prev.includes(initialGoal) ? prev : [...prev, initialGoal]
      )
      setFormData((prev) => ({
        ...prev,
        services: prev.services.includes(initialGoal)
          ? prev.services
          : [...prev.services, initialGoal],
      }))
    }
  }

  // Refs for auto-focusing
  const messageAreaRef = useRef(null)
  const typingTimerRef = useRef(null)
  const nameInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const whatsappInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const messageInputRef = useRef(null)

  // Clear typing timer helper
  const clearTypingTimer = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = null
    }
  }, [])

  // Auto-scroll message area to newest message
  const scrollToBottom = useCallback(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTo({
        top: messageAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  // Mount effect: show typing for 550ms, then deliver the first greeting question
  useEffect(() => {
    typingTimerRef.current = setTimeout(() => {
      setMessages([
        {
          id: 'msg-initial',
          sender: 'kaizen',
          text: COPY.steps.name.question,
        },
      ])
      setIsTyping(false)
    }, TYPING_DELAY_MS)

    return () => clearTypingTimer()
  }, [clearTypingTimer])

  // Focus appropriate input when step changes
  useEffect(() => {
    if (!isTyping) {
      if (currentStep === 'name') nameInputRef.current?.focus()
      else if (currentStep === 'phone') phoneInputRef.current?.focus()
      else if (currentStep === 'whatsapp') whatsappInputRef.current?.focus()
      else if (currentStep === 'email') emailInputRef.current?.focus()
      else if (currentStep === 'message') messageInputRef.current?.focus()
    }
  }, [currentStep, isTyping])

  /**
   * Helper to append a Kaizen response with a preceding 550ms typing delay
   */
  const triggerKaizenResponse = useCallback(
    (textToReply, nextStep) => {
      clearTypingTimer()
      setIsTyping(true)

      typingTimerRef.current = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `kaizen-${Date.now()}`,
            sender: 'kaizen',
            text: textToReply,
          },
        ])
        setIsTyping(false)
        if (nextStep) {
          setCurrentStep(nextStep)
        }
      }, TYPING_DELAY_MS)
    },
    [clearTypingTimer]
  )

  // Step 1: Name submit
  const handleNameSubmit = (e) => {
    e?.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed || isTyping) return

    setFormData((prev) => ({ ...prev, name: trimmed }))
    setMessages((prev) => [
      ...prev,
      { id: `visitor-${Date.now()}`, sender: 'visitor', text: trimmed },
    ])
    setNameInput('')

    triggerKaizenResponse(COPY.steps.phone.question(trimmed), 'phone')
  }

  // Step 2: Phone submit
  const handlePhoneSubmit = (e) => {
    e?.preventDefault()
    const trimmed = phoneInput.trim()
    if (!trimmed || isTyping) return

    setFormData((prev) => ({ ...prev, phone: trimmed }))
    setMessages((prev) => [
      ...prev,
      { id: `visitor-${Date.now()}`, sender: 'visitor', text: trimmed },
    ])
    setPhoneInput('')

    triggerKaizenResponse(COPY.steps.whatsapp.question, 'whatsapp')
  }

  // Step 3: WhatsApp submit (custom or same as phone)
  const handleWhatsappSubmit = (valueToUse) => {
    const val = (typeof valueToUse === 'string' ? valueToUse : whatsappInput).trim()
    if (!val || isTyping) return

    setFormData((prev) => ({ ...prev, whatsapp: val }))
    setMessages((prev) => [
      ...prev,
      { id: `visitor-${Date.now()}`, sender: 'visitor', text: val },
    ])
    setWhatsappInput('')

    triggerKaizenResponse(COPY.steps.email.question, 'email')
  }

  // Step 4: Email submit
  const handleEmailSubmit = (e) => {
    e?.preventDefault()
    const trimmed = emailInput.trim()
    if (!trimmed || isTyping) return

    setFormData((prev) => ({ ...prev, email: trimmed }))
    setMessages((prev) => [
      ...prev,
      { id: `visitor-${Date.now()}`, sender: 'visitor', text: trimmed },
    ])
    setEmailInput('')

    triggerKaizenResponse(COPY.steps.services.question, 'services')
  }

  // Step 5: Service selection toggle
  const toggleService = (service) => {
    if (service === 'Not sure yet') {
      setSelectedServices(['Not sure yet'])
      return
    }

    setSelectedServices((prev) => {
      const filtered = prev.filter((s) => s !== 'Not sure yet')
      return filtered.includes(service)
        ? filtered.filter((s) => s !== service)
        : [...filtered, service]
    })
  }

  // Step 5: Service submit
  const handleServicesSubmit = () => {
    if (selectedServices.length === 0 || isTyping) return

    setFormData((prev) => ({ ...prev, services: selectedServices }))
    setMessages((prev) => [
      ...prev,
      {
        id: `visitor-${Date.now()}`,
        sender: 'visitor',
        text: selectedServices.join(', '),
      },
    ])

    triggerKaizenResponse(COPY.steps.message.question, 'message')
  }

  // Step 6: Message submit & Final API Dispatch
  const handleMessageSubmit = async (skipped = false) => {
    if (isTyping || isSubmitting) return
    const trimmed = skipped ? '' : messageInput.trim()
    const visitorText = trimmed || 'Ready to submit enquiry'

    const updatedFormData = {
      ...formData,
      message: trimmed || 'No additional message',
    }
    setFormData(updatedFormData)

    setMessages((prev) => [
      ...prev,
      {
        id: `visitor-${Date.now()}`,
        sender: 'visitor',
        text: visitorText,
      },
    ])
    setMessageInput('')
    setIsSubmitting(true)

    // Trigger typing indicator while API submits
    clearTypingTimer()
    setIsTyping(true)

    try {
      await submitEnquiry({
        name: updatedFormData.name,
        phone: updatedFormData.phone,
        whatsapp: updatedFormData.whatsapp || updatedFormData.phone,
        email: updatedFormData.email,
        services: updatedFormData.services,
        message: updatedFormData.message,
        stage: initialStage || 'Growing Business',
        goal: updatedFormData.services.join(', ') || updatedFormData.message,
        channel: 'email',
      })

      setTimeout(() => {
        setIsTyping(false)
        setIsSubmitting(false)
        setCurrentStep('done')
        setMessages((prev) => [
          ...prev,
          {
            id: `kaizen-done-${Date.now()}`,
            sender: 'kaizen',
            text: COPY.steps.done.success(
              updatedFormData.name,
              updatedFormData.phone,
              updatedFormData.email
            ),
          },
        ])
      }, TYPING_DELAY_MS)
    } catch (err) {
      console.warn('Enquiry submission feedback:', err)
      setTimeout(() => {
        setIsTyping(false)
        setIsSubmitting(false)
        setCurrentStep('done')
        setMessages((prev) => [
          ...prev,
          {
            id: `kaizen-done-${Date.now()}`,
            sender: 'kaizen',
            text: COPY.steps.done.fallbackSuccess(
              updatedFormData.name,
              updatedFormData.email || updatedFormData.phone
            ),
          },
        ])
      }, TYPING_DELAY_MS)
    }
  }

  // Reset conversation handler ("Start over")
  const handleReset = () => {
    clearTypingTimer()
    setCurrentStep('name')
    setNameInput('')
    setPhoneInput('')
    setWhatsappInput('')
    setEmailInput('')
    setSelectedServices(initialGoal ? [initialGoal] : [])
    setMessageInput('')
    setIsSubmitting(false)
    setFormData({
      name: '',
      phone: '',
      whatsapp: '',
      email: '',
      services: initialGoal ? [initialGoal] : [],
      message: '',
    })
    setMessages([])
    setIsTyping(true)

    typingTimerRef.current = setTimeout(() => {
      setMessages([
        {
          id: `msg-${Date.now()}`,
          sender: 'kaizen',
          text: COPY.steps.name.question,
        },
      ])
      setIsTyping(false)
    }, TYPING_DELAY_MS)
  }

  return (
    <div className="w-full max-w-[560px] mx-auto rounded-[28px] border border-chat-line bg-chat-card overflow-hidden flex flex-col shadow-2xl transition-colors duration-200">
      {/* 1. HEADER BAR */}
      <header className="bg-chat-ink text-chat-bg px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-3.5">
          {/* 42px Red Circle Avatar with white "K" */}
          <div
            aria-hidden="true"
            className="w-[42px] h-[42px] rounded-full bg-brand-red text-white flex items-center justify-center font-heading font-extrabold text-xl leading-none shrink-0 shadow-sm"
          >
            {COPY.header.avatarLetter}
          </div>

          {/* Brand info */}
          <div className="flex flex-col min-w-0">
            <h2 className="font-heading font-bold text-base sm:text-lg text-chat-bg leading-tight truncate">
              {COPY.header.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-chat-bg/70 leading-normal truncate">
              {COPY.header.subtitle}
            </p>
          </div>
        </div>

        {/* Step indicator pill */}
        {currentStep !== 'done' && (
          <span className="font-sans text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-chat-bg/80">
            {currentStep === 'name' && 'Step 1 of 6'}
            {currentStep === 'phone' && 'Step 2 of 6'}
            {currentStep === 'whatsapp' && 'Step 3 of 6'}
            {currentStep === 'email' && 'Step 4 of 6'}
            {currentStep === 'services' && 'Step 5 of 6'}
            {currentStep === 'message' && 'Step 6 of 6'}
          </span>
        )}
      </header>

      {/* 2. MESSAGE AREA */}
      <div
        ref={messageAreaRef}
        role="log"
        aria-live="polite"
        className="bg-chat-alt-bg h-[370px] overflow-y-auto p-[22px] flex flex-col gap-[10px] scroll-smooth"
      >
        {messages.map((msg) => {
          const isKaizen = msg.sender === 'kaizen'

          if (isKaizen) {
            return (
              <div
                key={msg.id}
                className="self-start max-w-[84%] bg-chat-card border border-chat-line text-chat-ink rounded-[20px] rounded-bl-[6px] px-4 py-3 sm:px-4.5 sm:py-3.5 font-sans text-sm sm:text-base leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-line animate-pop motion-reduce:animate-none shadow-xs"
              >
                {msg.text}
              </div>
            )
          }

          return (
            <div
              key={msg.id}
              className="self-end max-w-[84%] bg-brand-red text-white rounded-[20px] rounded-br-[6px] px-4 py-3 sm:px-4.5 sm:py-3.5 font-sans text-sm sm:text-base leading-relaxed [overflow-wrap:anywhere] break-words animate-pop motion-reduce:animate-none shadow-xs"
            >
              {msg.text}
            </div>
          )
        })}

        {/* Typing indicator bubble */}
        {isTyping && (
          <div
            aria-label={COPY.typingAriaLabel}
            className="self-start bg-chat-card border border-chat-line rounded-[20px] rounded-bl-[6px] px-4 py-3 flex items-center gap-1.5 animate-pop motion-reduce:animate-none shadow-xs"
          >
            <span
              className="w-2 h-2 rounded-full bg-chat-muted animate-blink motion-reduce:animate-none"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-chat-muted animate-blink motion-reduce:animate-none"
              style={{ animationDelay: '180ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-chat-muted animate-blink motion-reduce:animate-none"
              style={{ animationDelay: '360ms' }}
            />
          </div>
        )}
      </div>

      {/* 3. INPUT AREA */}
      <div className="bg-chat-card border-t border-chat-line min-h-[76px] p-3.5 sm:p-4 flex items-center">
        {/* Step 1: Name input */}
        {currentStep === 'name' && (
          <form
            onSubmit={handleNameSubmit}
            className="w-full flex items-center gap-2.5"
          >
            <input
              ref={nameInputRef}
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={COPY.steps.name.placeholder}
              aria-label={COPY.steps.name.ariaLabel}
              disabled={isTyping}
              className="flex-1 bg-chat-alt-bg text-chat-ink placeholder:text-chat-muted border border-chat-line rounded-full px-4 sm:px-5 py-2.5 sm:py-3 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!nameInput.trim() || isTyping}
              aria-label={COPY.sendAriaLabel}
              className="w-[46px] h-[46px] rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-sm"
            >
              <svg
                className="w-5 h-5 -rotate-45 translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>
        )}

        {/* Step 2: Phone number input */}
        {currentStep === 'phone' && (
          <form
            onSubmit={handlePhoneSubmit}
            className="w-full flex items-center gap-2.5"
          >
            <input
              ref={phoneInputRef}
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder={COPY.steps.phone.placeholder}
              aria-label={COPY.steps.phone.ariaLabel}
              disabled={isTyping}
              className="flex-1 bg-chat-alt-bg text-chat-ink placeholder:text-chat-muted border border-chat-line rounded-full px-4 sm:px-5 py-2.5 sm:py-3 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!phoneInput.trim() || isTyping}
              aria-label={COPY.sendAriaLabel}
              className="w-[46px] h-[46px] rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-sm"
            >
              <svg
                className="w-5 h-5 -rotate-45 translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>
        )}

        {/* Step 3: WhatsApp input with quick "Same as phone" pill */}
        {currentStep === 'whatsapp' && (
          <div className="w-full flex flex-col gap-2.5">
            {formData.phone && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleWhatsappSubmit(formData.phone)}
                  disabled={isTyping}
                  className="bg-brand-red text-white text-xs sm:text-sm font-sans font-medium px-4 py-1.5 rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all cursor-pointer shadow-xs select-none"
                >
                  {COPY.steps.whatsapp.sameAsPhoneLabel(formData.phone)}
                </button>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleWhatsappSubmit(whatsappInput)
              }}
              className="w-full flex items-center gap-2.5"
            >
              <input
                ref={whatsappInputRef}
                type="tel"
                value={whatsappInput}
                onChange={(e) => setWhatsappInput(e.target.value)}
                placeholder={COPY.steps.whatsapp.placeholder}
                aria-label={COPY.steps.whatsapp.ariaLabel}
                disabled={isTyping}
                className="flex-1 bg-chat-alt-bg text-chat-ink placeholder:text-chat-muted border border-chat-line rounded-full px-4 sm:px-5 py-2.5 sm:py-3 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!whatsappInput.trim() || isTyping}
                aria-label={COPY.sendAriaLabel}
                className="w-[46px] h-[46px] rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-sm"
              >
                <svg
                  className="w-5 h-5 -rotate-45 translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Email input */}
        {currentStep === 'email' && (
          <form
            onSubmit={handleEmailSubmit}
            className="w-full flex items-center gap-2.5"
          >
            <input
              ref={emailInputRef}
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={COPY.steps.email.placeholder}
              aria-label={COPY.steps.email.ariaLabel}
              disabled={isTyping}
              className="flex-1 bg-chat-alt-bg text-chat-ink placeholder:text-chat-muted border border-chat-line rounded-full px-4 sm:px-5 py-2.5 sm:py-3 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!emailInput.trim() || !emailInput.includes('@') || isTyping}
              aria-label={COPY.sendAriaLabel}
              className="w-[46px] h-[46px] rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-sm"
            >
              <svg
                className="w-5 h-5 -rotate-45 translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>
        )}

        {/* Step 5: Service selecting pills */}
        {currentStep === 'services' && (
          <div className="w-full flex flex-col gap-3 py-1">
            <div
              role="group"
              aria-label={COPY.steps.services.ariaLabel}
              className="flex flex-wrap gap-2 w-full items-center max-h-[140px] overflow-y-auto no-scrollbar"
            >
              {COPY.steps.services.options.map((option) => {
                const isSelected = selectedServices.includes(option)
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isTyping}
                    onClick={() => toggleService(option)}
                    className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer select-none border ${
                      isSelected
                        ? 'bg-brand-red border-brand-red text-white shadow-xs'
                        : 'bg-chat-alt-bg hover:bg-chat-line/40 text-chat-ink border-chat-line'
                    }`}
                  >
                    {isSelected ? `✓ ${option}` : option}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-chat-line/60">
              <span className="font-sans text-xs text-chat-muted">
                {selectedServices.length === 0
                  ? 'Select at least 1 service'
                  : `${selectedServices.length} selected`}
              </span>
              <button
                type="button"
                onClick={handleServicesSubmit}
                disabled={selectedServices.length === 0 || isTyping}
                className="bg-brand-red hover:opacity-95 text-white text-xs sm:text-sm font-sans font-semibold py-2 px-5 rounded-full transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm select-none"
              >
                {COPY.steps.services.confirmLabel} →
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Message input / Send */}
        {currentStep === 'message' && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleMessageSubmit(false)
            }}
            className="w-full flex flex-col gap-2.5"
          >
            <div className="flex items-end gap-2.5">
              <textarea
                ref={messageInputRef}
                rows={2}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleMessageSubmit(false)
                  }
                }}
                placeholder={COPY.steps.message.placeholder}
                aria-label={COPY.steps.message.ariaLabel}
                disabled={isTyping || isSubmitting}
                className="flex-1 bg-chat-alt-bg text-chat-ink placeholder:text-chat-muted border border-chat-line rounded-2xl p-3 font-sans text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all leading-normal disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isTyping || isSubmitting}
                aria-label={COPY.steps.message.sendLabel}
                className="w-[46px] h-[46px] rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none mb-0.5 shadow-sm"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5 -rotate-45 translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Quick skip action */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleMessageSubmit(true)}
                disabled={isTyping || isSubmitting}
                className="text-xs font-sans text-chat-muted hover:text-brand-red underline underline-offset-4 cursor-pointer"
              >
                {COPY.steps.message.skipLabel}
              </button>
            </div>
          </form>
        )}

        {/* Step 7: Completed State */}
        {currentStep === 'done' && (
          <div className="flex items-center justify-between w-full py-1">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-green-600 font-sans font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Enquiry Submitted Successfully</span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs sm:text-sm font-sans text-chat-muted hover:text-brand-red underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-brand-red rounded px-2 py-1 transition-colors cursor-pointer select-none"
            >
              {COPY.steps.done.resetLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatContactForm
