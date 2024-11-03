import React from 'react';

export const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);