'use client';

import React, { createContext, useContext } from 'react';
import { useDataIntegration } from '@/hooks/useDataIntegration';

// Create context dengan type yang sama dengan return value dari useDataIntegration
const DataIntegrationContext = createContext<ReturnType<typeof useDataIntegration> | null>(null);

interface DataIntegrationProviderProps {
  children: React.ReactNode;
}

export const DataIntegrationProvider: React.FC<DataIntegrationProviderProps> = ({ children }) => {
  const dataIntegration = useDataIntegration();

  return (
    <DataIntegrationContext.Provider value={dataIntegration}>
      {children}
    </DataIntegrationContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useDataIntegrationContext = () => {
  const context = useContext(DataIntegrationContext);
  if (!context) {
    throw new Error('useDataIntegrationContext must be used within a DataIntegrationProvider');
  }
  return context;
}; 