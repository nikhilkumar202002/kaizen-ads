import { FiArrowUpRight } from 'react-icons/fi'

/**
 * Reusable square button with smooth left-to-right fill animation.
 * The styling (square shape, padding, typography, arrow animation) remains consistent,
 * while the color scheme can be changed per section using `variant` or direct color props.
 */
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
  // Optional direct color overrides for section-specific styling
  bg,
  textColor,
  borderColor,
  hoverBg,
  hoverTextColor,
  className = '',
  disabled = false,
  ...props
}) => {
  const content = text || children

  // Fixed size definitions (16px top-bottom, 30px left-right)
  const sizeStyles = {
    sm: 'py-2.5 px-5 gap-2.5',
    md: 'py-[16px] px-[30px] gap-3',
    lg: 'py-5 px-9 gap-4',
  }

  // Preset color variants for different section backgrounds
  const variantColorConfig = {
    // Brand primary red button (ideal for dark/hero sections) - borderless
    primary: {
      base: 'bg-primary text-white',
      slider: 'bg-white',
      hoverText: 'group-hover:text-black',
    },
    // Solid black button (ideal for white/light background sections)
    black: {
      base: 'bg-black text-white',
      slider: 'bg-white',
      hoverText: 'group-hover:text-black',
    },
    // Alias for black
    secondary: {
      base: 'bg-black text-white',
      slider: 'bg-white',
      hoverText: 'group-hover:text-black',
    },
    // White button (ideal for red or dark background sections)
    white: {
      base: 'bg-white text-black',
      slider: 'bg-primary',
      hoverText: 'group-hover:text-white',
    },
    // White button that fills with black
    whiteToBlack: {
      base: 'bg-white text-black',
      slider: 'bg-black',
      hoverText: 'group-hover:text-white',
    },
    // Transparent with white border (for dark sections)
    outline: {
      base: 'bg-transparent border border-white text-white',
      slider: 'bg-white',
      hoverText: 'group-hover:text-black',
    },
    // Transparent with black border (for light sections)
    outlineDark: {
      base: 'bg-transparent border border-black/40 text-black group-hover:border-black',
      slider: 'bg-black',
      hoverText: 'group-hover:text-white',
    },
    // Transparent with primary red border
    outlinePrimary: {
      base: 'bg-transparent border border-primary text-primary group-hover:border-primary',
      slider: 'bg-primary',
      hoverText: 'group-hover:text-white',
    },
  }

  const selectedConfig = variantColorConfig[variant] || variantColorConfig.primary

  // Allow direct color overrides if passed, otherwise use variant preset
  const baseColorClasses = [
    bg || '',
    borderColor || '',
    textColor || '',
  ]
    .filter(Boolean)
    .join(' ') || selectedConfig.base

  const activeSliderBg = hoverBg || selectedConfig.slider
  const activeHoverText = hoverTextColor || selectedConfig.hoverText

  // Fixed structural styling (100% consistent across all buttons)
  const baseStyles =
    'relative overflow-hidden inline-flex items-center justify-between font-heading font-normal text-[17px] capitalize tracking-normal rounded-none transition-all duration-300 group cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed'

  const buttonClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${baseColorClasses} ${className}`

  const iconElement = showIcon && Icon && (
    <Icon
      className={`relative z-10 text-[18px] transition-all duration-300 ${activeHoverText} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
    />
  )

  const contentElement = (
    <>
      {/* Smooth left-to-right filling animation layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${activeSliderBg} -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none`}
      />

      {/* Button text on top */}
      <span className={`relative z-10 transition-colors duration-300 ${activeHoverText}`}>
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
