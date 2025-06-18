"use client";

import { useEffect, useState } from "react";

interface HydrationSuppressorProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function HydrationSuppressor({ 
  children, 
  fallback = null 
}: HydrationSuppressorProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Hook to check if component is mounted on client
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
} 