import React from 'react';

const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-md px-4 py-2
        text-sm font-medium
        bg-brand-DEFAULT text-white
        hover:bg-brand-dark
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-brand-light
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors
        ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };