import React from 'react'
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
    sm: 'px-4 py-2.5 text-xs gap-3',
    md: 'px-6 py-3.5 text-sm gap-4',
    lg: 'px-8 py-4.5 text-base gap-5',
  }

  // Square icon box sizing
  const iconBoxSizes = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-7 h-7 text-base',
  }

  // Color variants (all with square edges - rounded-none)
  const variantStyles = {
    primary:
      'bg-primary text-white border border-primary hover:bg-primary-hover active:bg-[#99001c]',
    secondary:
      'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800',
    outline:
      'bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10',
    outlinePrimary:
      'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white',
    white:
      'bg-white text-black border border-white hover:bg-zinc-100',
  }

  const baseStyles =
    'inline-flex items-center justify-between font-heading font-semibold uppercase tracking-wider rounded-none transition-all duration-300 group cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed'

  const buttonClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`

  const iconElement = showIcon && Icon && (
    <span
      className={`inline-flex items-center justify-center rounded-none bg-black/15 group-hover:bg-black/25 transition-all duration-300 ${
        iconBoxSizes[size] || iconBoxSizes.md
      }`}
    >
      <Icon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )

  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        <span>{content}</span>
        {iconElement}
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
      <span>{content}</span>
      {iconElement}
    </button>
  )
}

export default Button
