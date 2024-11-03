import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

const Select = SelectPrimitive.Root;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={`
      flex h-10 w-full items-center justify-between
      rounded-md border border-gray-300 bg-white px-3 py-2
      text-sm placeholder:text-gray-500
      focus:outline-none focus:ring-2 focus:ring-brand-light
      disabled:cursor-not-allowed disabled:opacity-50
      ${className}`}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
));

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={`
        relative z-50 min-w-[8rem] overflow-hidden
        rounded-md border border-gray-200 bg-white
        shadow-md animate-in fade-in-80
        ${className}`}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={`
      relative flex cursor-default select-none items-center
      rounded-sm py-1.5 px-2 text-sm outline-none
      focus:bg-brand-light focus:text-white
      data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      ${className}`}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

const SelectValue = SelectPrimitive.Value;

SelectTrigger.displayName = 'SelectTrigger';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };