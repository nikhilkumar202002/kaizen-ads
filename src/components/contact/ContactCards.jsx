import { IoCall, IoMail, IoLocationSharp } from 'react-icons/io5'

const contactItems = [
  {
    icon: IoCall,
    label: 'Phone / WhatsApp',
    value: '+91 96052 81668',
    href: 'https://wa.me/919605281668',
    target: '_blank',
    rel: 'noopener noreferrer',
    ariaLabel: 'Contact Kaizen Ads via WhatsApp or Phone at +91 96052 81668',
  },
  {
    icon: IoMail,
    label: 'Email',
    value: 'info@kaizenads.in',
    href: 'mailto:info@kaizenads.in',
    ariaLabel: 'Send email to info@kaizenads.in',
  },
  {
    icon: IoLocationSharp,
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
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {contactItems.map((item, index) => {
        const Icon = item.icon
        return (
          <a
            key={index}
            href={item.href}
            target={item.target}
            rel={item.rel}
            aria-label={item.ariaLabel}
            className="bg-[#181512] border border-[#2F2922] hover:border-brand-red/70 hover:bg-[#1E1A16] rounded-[28px] p-6 sm:p-7 lg:p-8 flex items-center gap-5 sm:gap-6 transition-all duration-200 group text-left shadow-xl select-none"
          >
            {/* Red Circle with Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-md">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            {/* Label and Value */}
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-sm sm:text-[15px] text-[#A59E90] font-normal mb-1.5 tracking-normal">
                {item.label}
              </span>
              <p className="font-heading font-bold text-lg sm:text-xl lg:text-[22px] text-white tracking-tight leading-snug">
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

