"use client"
import { createContext, useContext } from 'react';
import useSnackbar from '../hooks/useSnackbar';

const SnackbarContext = createContext<{ showSnackbar: (message: string, type?: 'success' | 'error' | 'info') => void } | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackbarComponent />
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider');
  }
  return context;
};
