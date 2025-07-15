// frontend/src/components/PhoneInput.tsx
import React, { useState, useEffect } from 'react'
import { cn } from '../utils'

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  label?: string;
  value?: string;
  error?: string;
  showError?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const formatPhoneNumber = (digits: string): string => {
  const limitedDigits = digits.substring(0, 10);
  const length = limitedDigits.length;

  if (length === 0) return '';
  if (length <= 3) return `(${limitedDigits}`;
  if (length <= 6) return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
  return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
};

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, label, value = '', error, showError = false, onChange, size = 'medium', ...props }, ref) => {
    const [hasValue, setHasValue] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      setHasValue(value !== '');
    }, [value]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Always start with the raw digits from the input
      const rawInput = e.target.value;
      const digits = rawInput.replace(/\D/g, '');

      // Update the parent component with the raw, unformatted digits
      if (onChange) {
        onChange(digits);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) { props.onFocus(e); }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) { props.onBlur(e); }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'small': return { container: 'h-10', input: 'pl-2.5 pr-3 pt-4 pb-2 text-sm', label: isFocused || hasValue ? 'top-0.5 left-3 text-xs' : 'top-1/2 -translate-y-1/2 left-3 text-sm' }
        case 'large': return { container: 'h-14', input: 'pl-5 pr-5 pt-6 pb-2 text-lg', label: isFocused || hasValue ? 'top-1 left-5 text-sm' : 'top-1/2 -translate-y-1/2 left-5 text-lg' }
        default: return { container: 'h-12', input: 'pl-3.5 pr-4 pt-5 pb-2 text-base', label: isFocused || hasValue ? 'top-1 left-4 text-sm' : 'top-1/2 -translate-y-1/2 left-4 text-sm' }
      }
    };
    
    const sizeStyles = getSizeStyles();
    // The value displayed in the input is always the formatted version
    const displayValue = formatPhoneNumber(value);

    return (
      <div className="w-full">
        <div className="relative my-4 floating-label-container">
          <input
            type="tel"
            className={cn(`${sizeStyles.container} w-full rounded-sm border-2 ${sizeStyles.input} text-portola-green bg-cloud font-serif focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-sand floating-input`, showError && error && !isFocused ? 'border-alert' : isFocused ? 'border-grass' : 'border-pebble hover:border-dried-thyme', className)}
            ref={ref}
            placeholder=" "
            value={displayValue}
            onChange={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={14} // (XXX) XXX-XXXX
            {...props}
          />
          {label && ( <label className={cn('pointer-events-none absolute font-serif transition-all duration-200 floating-label', `${sizeStyles.label}`, isFocused || hasValue ? 'text-grass' : showError && error ? 'text-alert' : 'text-steel')}> {label} </label> )}
        </div>
        {showError && error && !isFocused && ( <div className="flex items-center gap-1.5 -mt-3"> <svg className="w-3 h-3 text-alert flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /> </svg> <p className="text-sm text-alert font-serif"> {error} </p> </div> )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
export { PhoneInput };