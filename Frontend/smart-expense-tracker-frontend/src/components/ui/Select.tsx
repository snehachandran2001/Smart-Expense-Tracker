import React from 'react';
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    // These classes apply to all variants and sizes for a consistent base style.
    const baseClasses =
      'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';

    // Tailwind classes for different color variants.
    const variantClasses = {
      primary: 'bg-white text-gray-900 ring-gray-300 focus:ring-indigo-600',
      secondary: 'bg-gray-100 text-gray-800 ring-gray-400 focus:ring-gray-600',
    };

    // Tailwind classes for different sizes.
    const sizeClasses = {
      sm: 'text-xs h-8',
      md: 'text-sm h-10',
      lg: 'text-lg h-12',
    };

    return (
      <select
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select };
