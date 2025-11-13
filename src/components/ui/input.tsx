import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-1">
          {leftIcon && (
            <span className="text-muted">{leftIcon}</span>
          )}
          <input
            type={type}
            className={cn(
              'flex-1 border-0 bg-transparent text-sm text-foreground placeholder:text-muted focus-visible:outline-none',
              className,
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && <span className="text-muted">{rightIcon}</span>}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
