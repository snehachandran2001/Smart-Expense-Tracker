import React from 'react';
import { twMerge } from 'tailwind-merge';

// Extend the standard Input HTML attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Use forwardRef to allow parent components to pass refs to the underlying input element.
// This is useful for focusing the input programmatically.
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        'block w-full rounded-md border-gray-300 shadow-sm',
        'focus:border-indigo-500 focus:ring-indigo-500',
        'sm:text-sm',
        className, // Allow overriding styles
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input'; // Assigning a display name for better debugging
