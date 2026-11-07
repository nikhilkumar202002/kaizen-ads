import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const contactItems = [
  {
    icon: FiPhone,
    label: 'Phone / WhatsApp',
    value: '+91 96052 81668',
    href: 'https://wa.me/919605281668',
    target: '_blank',
    rel: 'noopener noreferrer',
    ariaLabel: 'Contact Kaizen Ads via WhatsApp or Phone at +91 96052 81668',
  },
  {
    icon: FiMail,
    label: 'Email',
    value: 'info@kaizenads.in',
    href: 'mailto:info@kaizenads.in',
    ariaLabel: 'Send email to info@kaizenads.in',
  },
  {
    icon: FiMapPin,
    label: 'Office',
    value: (
      <>
        Hilite Business Park, Tower 2,
        <br />
        Second Floor, Kozhikode – 673014
      </>
    ),
    href: 'https://maps.google.com/?q=Hilite+Business+Park,+Tower+2,+Kozhikode,+Kerala',
    target: '_blank',
    rel: 'noopener noreferrer',
    ariaLabel: 'View Kaizen Ads office location on Google Maps',
  },
]

const ContactCards = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full">
      {contactItems.map((item, index) => {
        const Icon = item.icon
        return (
          <a
            key={index}
            href={item.href}
            target={item.target}
            rel={item.rel}
            aria-label={item.ariaLabel}
            className="bg-[#14120E] border border-white/10 hover:border-brand-red/60 hover:bg-[#1A1712] rounded-[24px] p-5 sm:p-6 lg:p-7 flex items-center gap-4 sm:gap-5 transition-all duration-200 group text-left shadow-lg select-none"
          >
            {/* Red Circle with Icon */}
            <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-md">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Label and Value */}
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-xs sm:text-sm text-neutral-400 font-medium mb-1">
                {item.label}
              </span>
              <p className="font-heading font-bold text-base sm:text-lg lg:text-[19px] text-white tracking-tight leading-snug">
                {item.value}
              </p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default ContactCards

