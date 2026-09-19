'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
}

export function useKeyboardShortcuts({ shortcuts }: UseKeyboardShortcutsProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't intercept when typing in an input/textarea
    const target = event.target as HTMLElement;
    const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

    const matchingShortcut = shortcuts.find(shortcut => {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = !!(event.ctrlKey || event.metaKey) === !!(shortcut.ctrl || shortcut.meta);
      const shiftMatch = !!event.shiftKey === !!shortcut.shift;
      const altMatch = !!event.altKey === !!shortcut.alt;

      // Allow Escape and F-keys even when typing
      if (isTyping && !['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(shortcut.key)) {
        return false;
      }

      return keyMatch && ctrlMatch && shiftMatch && altMatch;
    });

    if (matchingShortcut) {
      event.preventDefault();
      event.stopPropagation();
      matchingShortcut.action();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return shortcuts;
}

// Dashboard-specific shortcuts
export type DashboardShortcuts = {
  toggleTasks: () => void;
  toggleNotes: () => void;
  toggleTimer: () => void;
  toggleMusic: () => void;
  toggleSettings: () => void;
};

export function useDashboardShortcuts(callbacks: DashboardShortcuts) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: '1',
      action: callbacks.toggleTasks,
      description: 'Toggle Tasks',
    },
    {
      key: '2',
      action: callbacks.toggleNotes,
      description: 'Toggle Notes',
    },
    {
      key: '3',
      action: callbacks.toggleTimer,
      description: 'Toggle Timer',
    },
    {
      key: 'm',
      action: callbacks.toggleMusic,
      description: 'Toggle Music',
    },
    {
      key: ',',
      ctrl: true,
      action: callbacks.toggleSettings,
      description: 'Settings',
    },
    {
      key: '/',
      ctrl: true,
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      },
      description: 'Focus Search',
    },
    {
      key: 'Escape',
      action: () => {
        // Close any open sidebar/overlay by clicking the overlay
        const overlay = document.querySelector('[class*="backdrop-blur-sm"]');
        if (overlay) {
          (overlay as HTMLElement).click();
        }
        // Blur any active input
        const active = document.activeElement as HTMLElement;
        if (active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA') {
          active.blur();
        }
      },
      description: 'Close/Dismiss',
    },
  ];

  return useKeyboardShortcuts({ shortcuts });
}
