'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseAutoOpenDialogReturn {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

/**
 * Custom hook for managing auto-opening dialogs with local storage persistence.
 * Opens the dialog automatically only once.
 */
export function useAutoOpenDialog(
  dialogId: string,
  intervalMinutes: number = 15,
): UseAutoOpenDialogReturn {
  const [isOpen, setIsOpen] = useState(false);

  const storageKey = `dialog_${dialogId}_last_opened`;

  const openDialog = useCallback(() => {
    setIsOpen(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, Date.now().toString());
    }
  }, [storageKey]);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lastOpenedStr = localStorage.getItem(storageKey);
    let shouldOpen = false;

    if (!lastOpenedStr) {
      shouldOpen = true;
    } else {
      const lastOpened = parseInt(lastOpenedStr, 10);
      if (!isNaN(lastOpened)) {
        const diffMs = Date.now() - lastOpened;
        const intervalMs = intervalMinutes * 60 * 1000;
        if (diffMs >= intervalMs) {
          shouldOpen = true;
        }
      } else {
        shouldOpen = true;
      }
    }

    if (shouldOpen) {
      // Auto open once on initial mount after a slight delay
      const timer = setTimeout(() => {
        openDialog();
      }, 3000); // 3 seconds delay for better UX

      return () => clearTimeout(timer);
    }
  }, [openDialog, storageKey, intervalMinutes]);

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
}
