import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-serif font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border',
  {
    variants: {
      variant: {
        primary: 'bg-portola-green text-cloud border-portola-green hover:bg-pine-shadow shadow-soft hover:shadow-medium',
        secondary: 'bg-forest-moss text-cloud border-forest-moss hover:bg-portola-green shadow-soft hover:shadow-medium',
        accent: 'bg-railway-gold text-portola-green border-railway-gold hover:bg-burnished-brass shadow-soft hover:shadow-medium',
        'dried-thyme': 'bg-dried-thyme text-portola-green border-dried-thyme hover:brightness-90 shadow-soft hover:shadow-medium',
        pebble: 'bg-pebble text-portola-green border-pebble hover:brightness-90 shadow-soft hover:shadow-medium',
        sand: 'bg-sand text-portola-green border-sand hover:brightness-90 shadow-soft hover:shadow-medium',
        outline: 'border-portola-green text-portola-green bg-transparent hover:bg-pebble shadow-soft hover:shadow-medium',
        ghost: 'border-transparent text-portola-green hover:bg-sand',
        danger: 'bg-alert text-cloud border-alert hover:bg-red-700 hover:border-red-700 shadow-soft hover:shadow-medium',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-sm',
        md: 'h-10 px-4 py-2 text-sm rounded-sm',
        lg: 'h-12 px-6 text-base rounded-sm',
        xl: 'h-14 px-8 text-lg rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }