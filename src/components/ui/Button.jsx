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

  // Size variations
  const sizeStyles = {
    sm: 'px-4 py-2 gap-3',
    md: 'px-6 py-3.5 gap-4',
    lg: 'px-8 py-4.5 gap-5',
  }

  // Square icon box sizing
  const iconBoxSizes = {
    sm: 'w-5 h-5 text-sm',
    md: 'w-6 h-6 text-base',
    lg: 'w-7 h-7 text-lg',
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
    'relative overflow-hidden inline-flex items-center justify-between font-heading font-normal text-[17px] uppercase tracking-wider rounded-none border transition-all duration-300 group cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed'

  const buttonClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`

  const iconElement = showIcon && Icon && (
    <span
      className={`relative z-10 inline-flex items-center justify-center rounded-none bg-black/15 group-hover:bg-black/10 transition-all duration-300 ${
        iconBoxSizes[size] || iconBoxSizes.md
      }`}
    >
      <Icon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )

  const contentElement = (
    <>
      {/* Smooth left-to-right white filling layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${sliderBgColor} -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none`}
      />

      {/* Button text on top */}
      <span className="relative z-10 transition-colors duration-300">
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
