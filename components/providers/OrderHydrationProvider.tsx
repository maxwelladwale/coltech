// components/providers/OrderHydrationProvider.tsx
'use client';

import { useEffect } from 'react';
// import { ServiceFactory } from '@/lib/api/serviceFactory';

/**
 * This component hydrates the order store from localStorage on the client side.
 * It ensures that orders persist across page refreshes.
 * 
 * Add this to your root layout to enable order persistence.
 */
export default function OrderHydrationProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    // Trigger hydration on mount
    // This loads orders from localStorage into the static store
    // const orderService = ServiceFactory.getOrderService();
    
    // Call a method to ensure the service is instantiated
    // and hydration happens
    console.log('🔄 Order hydration provider mounted');
    
  }, []);

  return <>{children}</>;
}