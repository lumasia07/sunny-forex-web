import React, { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

interface IntercomProviderProps {
  children: React.ReactNode;
}

export function IntercomProvider({ children }: IntercomProviderProps) {
  useEffect(() => {
    const appId = import.meta.env.VITE_INTERCOM_APP_ID;
    if (!appId) {
      console.warn(
        'Intercom App ID is missing. Please define VITE_INTERCOM_APP_ID in your .env file to enable the chat widget.'
      );
      return;
    }

    try {
      Intercom({
        app_id: appId,
      });
    } catch (error) {
      console.error('Failed to initialize Intercom:', error);
    }
  }, []);

  return <>{children}</>;
}
