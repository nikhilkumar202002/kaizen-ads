import { useState, useRef, useEffect, useCallback } from 'react'
import { submitEnquiry } from '../../utils/enquiries.service'
import { trackWhatsAppClick, trackEmailClick } from '../../utils/tracking.service'

/**
 * All copy and configuration tokens kept centralized at the top
 */
const COPY = {
  header: {
    avatarLetter: 'K',
    title: 'Kaizen Ads',
    subtitle: 'Tell us about your business',
  },
  steps: {
    name: {
      question: "Hi! 👋 We’re the Kaizen Ads team. What’s your name?",
      placeholder: 'Type your name',
      ariaLabel: 'Type your name',
    },
    stage: {
      question: (name) => `Nice to meet you, ${name}. Where are you today?`,
      options: [
        'Starting something new',
        'Growing an existing business',
        'Not sure yet',
      ],
      ariaLabel: 'Select where your business is today',
    },
    goal: {
      question:
        'Got it. What are you trying to achieve? “Not sure yet” is a fine answer.',
      placeholder:
        'A new brand, more enquiries, a website… or just “not sure yet”.',
      ariaLabel: 'Describe what you are trying to achieve',
    },
    done: {
      question: (name) =>
        `Thanks, ${name}! Choose how you’d like to send this and we’ll take it from there.`,
      whatsappLabel: 'Send on WhatsApp',
      emailLabel: 'Send by email',
      resetLabel: 'Start over',
    },
  },
  sendAriaLabel: 'Send',
  typingAriaLabel: 'Kaizen Ads is typing…',
  whatsappNumber: '919605281668',
  emailRecipient: 'info@kaizenads.in',
  emailSubject: 'Discovery call enquiry',
  formatTemplate: ({ name, stage, goal }) =>
    `Hi Kaizen Ads, I’m ${name}.\nStage: ${stage}\n\n${goal}`,
}

const TYPING_DELAY_MS = 550

const ChatContactForm = ({ initialGoal = '', initialStage = '' }) => {
  // Conversation state machine: 'name' | 'stage' | 'goal' | 'done'
  const [currentStep, setCurrentStep] = useState('name')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(true)

  // Form field state
  const [formData, setFormData] = useState({
    name: '',
    stage: initialStage,
    goal: initialGoal,
  })
  const [nameInput, setNameInput] = useState('')
  const [goalInput, setGoalInput] = useState(initialGoal)

  // Sync props when initialGoal or initialStage change during render
  const [prevInitialGoal, setPrevInitialGoal] = useState(initialGoal)
  const [prevInitialStage, setPrevInitialStage] = useState(initialStage)

  if (prevInitialGoal !== initialGoal) {
    setPrevInitialGoal(initialGoal)
    setGoalInput(initialGoal)
    setFormData((prev) => ({ ...prev, goal: initialGoal }))
  }

  if (prevInitialStage !== initialStage) {
    setPrevInitialStage(initialStage)
    setFormData((prev) => ({ ...prev, stage: initialStage }))
  }

  // Refs
  const messageAreaRef = useRef(null)
  const typingTimerRef = useRef(null)
  const nameInputRef = useRef(null)
  const goalInputRef = useRef(null)

  // Clear any active typing timer helper
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

  // Mount effect: show typing for 550ms, then deliver the first greeting message
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
      if (currentStep === 'name') {
        nameInputRef.current?.focus()
      } else if (currentStep === 'goal') {
        goalInputRef.current?.focus()
      }
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

  // Step 1: Name submit handler
  const handleNameSubmit = (e) => {
    e?.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed || isTyping) return

    setFormData((prev) => ({ ...prev, name: trimmed }))
    setMessages((prev) => [
      ...prev,
      {
        id: `visitor-${Date.now()}`,
        sender: 'visitor',
        text: trimmed,
      },
    ])
    setNameInput('')

    triggerKaizenResponse(COPY.steps.stage.question(trimmed), 'stage')
  }

  // Step 2: Stage pill select handler
  const handleStageSelect = (selectedStage) => {
    if (isTyping) return

    setFormData((prev) => ({ ...prev, stage: selectedStage }))
    setMessages((prev) => [
      ...prev,
      {
        id: `visitor-${Date.now()}`,
        sender: 'visitor',
        text: selectedStage,
      },
    ])

    triggerKaizenResponse(COPY.steps.goal.question, 'goal')
  }

  // Step 3: Goal submit handler
  const handleGoalSubmit = (e) => {
    e?.preventDefault()
    const trimmed = goalInput.trim()
    if (!trimmed || isTyping) return

    setFormData((prev) => ({ ...prev, goal: trimmed }))
    setMessages((prev) => [
      ...prev,
      {
        id: `visitor-${Date.now()}`,
        sender: 'visitor',
        text: trimmed,
      },
    ])

    triggerKaizenResponse(COPY.steps.done.question(formData.name), 'done')
  }

  // Goal textarea Enter / Shift+Enter keydown handler
  const handleGoalKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGoalSubmit()
    }
  }

  /**
   * Unified enquiry dispatcher: submits data to Kaizen Ads backend API
   * and opens the chosen communication channel (WhatsApp or Email)
   */
  const sendEnquiry = (channel) => {
    // Submit lead payload to backend API (https://api.kaizenads.in/api/v1/enquiries)
    try {
      submitEnquiry({
        name: formData.name,
        stage: formData.stage,
        goal: formData.goal,
        channel: channel === 'whatsapp' ? 'whatsapp' : 'email',
        services: [],
        message: formData.goal,
      }).catch((err) => {
        // Gracefully log if API has network/validation issues without disrupting customer
        console.warn('Backend enquiry submission notice:', err)
      })
    } catch (err) {
      console.warn('API submission failed:', err)
    }

    const rawMessage = COPY.formatTemplate(formData)
    const encodedMessage = encodeURIComponent(rawMessage)

    if (channel === 'whatsapp') {
      trackWhatsAppClick(COPY.whatsappNumber)
      const url = `https://wa.me/${COPY.whatsappNumber}?text=${encodedMessage}`
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }

    if (channel === 'email') {
      trackEmailClick(COPY.emailRecipient)
      const subject = encodeURIComponent(COPY.emailSubject)
      window.location.href = `mailto:${COPY.emailRecipient}?subject=${subject}&body=${encodedMessage}`
      return
    }
  }

  // Reset conversation handler ("Start over")
  const handleReset = () => {
    clearTypingTimer()
    setCurrentStep('name')
    setNameInput('')
    setGoalInput(initialGoal)
    setFormData({
      name: '',
      stage: '',
      goal: initialGoal,
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
      <header className="bg-chat-ink text-chat-bg px-5 py-4 sm:px-6 sm:py-4.5 flex items-center gap-3.5 select-none">
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
      </header>

      {/* 2. MESSAGE AREA */}
      <div
        ref={messageAreaRef}
        role="log"
        aria-live="polite"
        className="bg-chat-alt-bg h-[360px] overflow-y-auto p-[22px] flex flex-col gap-[10px] scroll-smooth"
      >
        {messages.map((msg) => {
          const isKaizen = msg.sender === 'kaizen'

          if (isKaizen) {
            return (
              <div
                key={msg.id}
                className="self-start max-w-[84%] bg-chat-card border border-chat-line text-chat-ink rounded-[20px] rounded-bl-[6px] px-4 py-3 sm:px-4.5 sm:py-3.5 font-sans text-sm sm:text-base leading-relaxed [overflow-wrap:anywhere] break-words animate-pop motion-reduce:animate-none shadow-xs"
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

        {/* Step 2: Stage selection pills */}
        {currentStep === 'stage' && (
          <div
            role="group"
            aria-label={COPY.steps.stage.ariaLabel}
            className="flex flex-wrap gap-2 w-full items-center"
          >
            {COPY.steps.stage.options.map((option) => (
              <button
                key={option}
                type="button"
                disabled={isTyping}
                onClick={() => handleStageSelect(option)}
                className="bg-chat-alt-bg hover:bg-chat-line/40 text-chat-ink border border-chat-line rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-sans font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-colors cursor-pointer text-left disabled:opacity-50 select-none"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Goal textarea */}
        {currentStep === 'goal' && (
          <form
            onSubmit={handleGoalSubmit}
            className="w-full flex items-end gap-2.5"
          >
            <textarea
              ref={goalInputRef}
              rows={2}
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              onKeyDown={handleGoalKeyDown}
              placeholder={COPY.steps.goal.placeholder}
              aria-label={COPY.steps.goal.ariaLabel}
              disabled={isTyping}
              className="flex-1 bg-chat-alt-bg text-chat-ink placeholder:text-chat-muted border border-chat-line rounded-2xl p-3 font-sans text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all leading-normal disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!goalInput.trim() || isTyping}
              aria-label={COPY.sendAriaLabel}
              className="w-[46px] h-[46px] rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none mb-0.5 shadow-sm"
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

        {/* Step 4: Final sending actions */}
        {currentStep === 'done' && (
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full">
            {/* WhatsApp action */}
            <button
              type="button"
              onClick={() => sendEnquiry('whatsapp')}
              className="bg-brand-red hover:opacity-95 text-white font-sans text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-all cursor-pointer shadow-sm select-none"
            >
              <svg
                className="w-4 h-4 shrink-0 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>{COPY.steps.done.whatsappLabel}</span>
            </button>

            {/* Email action */}
            <button
              type="button"
              onClick={() => sendEnquiry('email')}
              className="border border-chat-line hover:border-chat-ink bg-transparent text-chat-ink font-sans text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-colors cursor-pointer select-none"
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{COPY.steps.done.emailLabel}</span>
            </button>

            {/* Reset / Start over action */}
            <button
              type="button"
              onClick={handleReset}
              className="text-xs sm:text-sm font-sans text-chat-muted hover:text-brand-red underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-brand-red rounded px-1.5 py-1 transition-colors cursor-pointer select-none ml-auto sm:ml-0"
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
