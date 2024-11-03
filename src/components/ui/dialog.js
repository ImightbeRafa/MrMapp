import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={`
        fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
        bg-white rounded-lg p-6 shadow-lg
        w-full max-w-md max-h-[85vh]
        ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

const DialogHeader = ({ className, ...props }) => (
  <div className={`mb-4 ${className}`} {...props} />
);

const DialogTitle = React.forwardRef((props, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className="text-lg font-semibold"
    {...props}
  />
));

const DialogFooter = ({ className, ...props }) => (
  <div className={`mt-6 flex justify-end space-x-2 ${className}`} {...props} />
);

DialogContent.displayName = 'DialogContent';
DialogTitle.displayName = 'DialogTitle';

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter };