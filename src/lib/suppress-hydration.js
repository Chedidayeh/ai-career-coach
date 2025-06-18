// Suppress hydration warnings in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('Hydration') || 
       message.includes('hydration') ||
       message.includes('Warning: Text content did not match') ||
       message.includes('Warning: Expected server HTML to contain'))
    ) {
      return; // Suppress hydration warnings
    }
    originalError.apply(console, args);
  };

  // Also suppress React warnings about hydration
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('Hydration') || 
       message.includes('hydration') ||
       message.includes('Warning: Text content did not match') ||
       message.includes('Warning: Expected server HTML to contain'))
    ) {
      return; // Suppress hydration warnings
    }
    originalWarn.apply(console, args);
  };
}

export default function suppressHydrationWarnings() {
  // This function can be called to manually suppress warnings
  if (typeof window !== 'undefined') {
    // Override console methods to filter out hydration warnings
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args[0];
      if (
        typeof message === 'string' &&
        (message.includes('Hydration') || 
         message.includes('hydration') ||
         message.includes('Warning: Text content did not match') ||
         message.includes('Warning: Expected server HTML to contain'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0];
      if (
        typeof message === 'string' &&
        (message.includes('Hydration') || 
         message.includes('hydration') ||
         message.includes('Warning: Text content did not match') ||
         message.includes('Warning: Expected server HTML to contain'))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };
  }
} 