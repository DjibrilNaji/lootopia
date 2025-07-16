import { useCallback } from 'react';
import { useToast as useNativeToast } from 'react-native-toast-notifications';

export const useToast = () => {
  const toast = useNativeToast();

  const show = useCallback((message: string, options?: { type?: 'success' | 'danger' | 'warning' | 'normal' }) => {
    toast.show(message, {
      type: options?.type || 'normal',
      placement: 'bottom',
      duration: 3000,
    });
  }, [toast]);

  return { show };
};
