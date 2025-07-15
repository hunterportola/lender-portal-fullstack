// frontend/src/components/SocialSecurityNumberInput.tsx
import React from 'react';
import { InputLarge } from './InputLarge';
import type { InputLargeProps } from './InputLarge';

interface SocialSecurityNumberInputProps extends Omit<InputLargeProps, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

const formatSSN = (value: string): string => {
  // 1. Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // 2. Limit to 9 digits
  const limitedDigits = digits.slice(0, 9);

  // 3. Apply formatting
  if (limitedDigits.length > 5) {
    return `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3, 5)}-${limitedDigits.slice(5)}`;
  } else if (limitedDigits.length > 3) {
    return `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3)}`;
  }
  return limitedDigits;
};

export const SocialSecurityNumberInput = React.forwardRef<HTMLInputElement, SocialSecurityNumberInputProps>(
  ({ value, onChange, ...props }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Get the formatted value from our helper function
      const formatted = formatSSN(e.target.value);
      // Pass only the digits back to the parent component's state
      const digitsOnly = formatted.replace(/\D/g, '');
      onChange(digitsOnly);
    };

    // We display the formatted value, but store the raw digits
    const displayValue = formatSSN(value);

    return (
      <InputLarge
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        maxLength={11} // ###-##-#### is 11 characters
        type="tel" // Use "tel" for better mobile keyboard support
      />
    );
  }
);

SocialSecurityNumberInput.displayName = 'SocialSecurityNumberInput';