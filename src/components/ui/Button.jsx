import { FiArrowUpRight } from 'react-icons/fi'

const Button = ({
  children,
  text,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon = FiArrowUpRight,
  showIcon = true,
  className = '',
  disabled = false,
  ...props
}) => {
  const content = text || children

  // Size variations (default md has 16px top-bottom, 30px left-right padding)
  const sizeStyles = {
    sm: 'py-2.5 px-5 gap-2.5',
    md: 'py-[16px] px-[30px] gap-3',
    lg: 'py-5 px-9 gap-4',
  }

  // Variant color definitions
  const variantStyles = {
    primary:
      'bg-primary border-primary text-white group-hover:text-black',
    secondary:
      'bg-zinc-950 border-zinc-800 text-white group-hover:text-black',
    outline:
      'bg-transparent border-white/40 text-white group-hover:text-black group-hover:border-white',
    outlinePrimary:
      'bg-transparent border-primary text-primary group-hover:text-white',
    white:
      'bg-white border-white text-black group-hover:text-white',
  }

  // Fill animation background color based on variant
  const sliderBgColor =
    variant === 'outlinePrimary' || variant === 'white'
      ? 'bg-primary'
      : 'bg-white'

  const baseStyles =
    'relative overflow-hidden inline-flex items-center justify-between font-heading font-normal text-[17px] capitalize tracking-normal rounded-none border transition-all duration-300 group cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed'

  const buttonClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`

  const iconElement = showIcon && Icon && (
    <Icon className="relative z-10 text-[18px] transition-all duration-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  )

  const contentElement = (
    <>
      {/* Smooth left-to-right white filling layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${sliderBgColor} -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none`}
      />

      {/* Button text on top */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {content}
      </span>

      {/* Button icon on top */}
      {iconElement}
    </>
  )

  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {contentElement}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {contentElement}
    </button>
  )
}

export default Button
