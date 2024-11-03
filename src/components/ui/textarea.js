import React from 'react';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`
        flex min-h-[80px] w-full rounded-md
        border border-gray-300 bg-white
        px-3 py-2 text-sm ring-offset-white
        placeholder:text-gray-500
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brand-light
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };