'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
}

export function useKeyboardShortcuts({ shortcuts }: UseKeyboardShortcutsProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const matchingShortcut = shortcuts.find(shortcut => {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = !!event.ctrlKey === !!shortcut.ctrl;
      const shiftMatch = !!event.shiftKey === !!shortcut.shift;
      const altMatch = !!event.altKey === !!shortcut.alt;

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

// Predefined shortcuts for the application
export const appShortcuts: KeyboardShortcut[] = [
  {
    key: 'n',
    ctrl: true,
    action: () => {
      // Focus on new task/note input
      const newTaskInput = document.querySelector('input[placeholder*="Task"], input[placeholder*="Note"]') as HTMLInputElement;
      newTaskInput?.focus();
    },
    description: 'New task/note'
  },
  {
    key: 'f',
    ctrl: true,
    action: () => {
      // Toggle search/filters
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
      searchInput?.focus();
    },
    description: 'Focus search'
  },
  {
    key: 's',
    ctrl: true,
    action: () => {
      // Start/stop stopwatch
      const startButton = document.querySelector('button:has-text("Start"), button:has-text("Stop")') as HTMLButtonElement;
      startButton?.click();
    },
    description: 'Start/stop stopwatch'
  },
  {
    key: 'l',
    ctrl: true,
    action: () => {
      // Add lap to stopwatch
      const lapButton = document.querySelector('button[title*="Lap"], button:has(svg)') as HTMLButtonElement;
      lapButton?.click();
    },
    description: 'Add lap'
  },
  {
    key: 'Escape',
    action: () => {
      // Close modals, clear search, etc.
      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement?.type === 'text') {
        activeElement.blur();
      }
    },
    description: 'Close/cancel'
  },
  {
    key: 'Enter',
    ctrl: true,
    action: () => {
      // Submit form
      const activeElement = document.activeElement;
      if (activeElement?.closest('form')) {
        (activeElement.closest('form') as HTMLFormElement)?.requestSubmit();
      }
    },
    description: 'Submit form'
  }
];

// Hook for global app shortcuts
export function useAppShortcuts() {
  return useKeyboardShortcuts({ shortcuts: appShortcuts });
}

// Component to display available shortcuts
export function KeyboardShortcutsHelp() {
  const shortcuts = useKeyboardShortcuts({ shortcuts: appShortcuts });

  return (
    <div className="fixed bottom-4 right-4 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg p-4 border border-[rgba(255,255,255,.1)] z-50">
      <h3 className="text-white font-medium mb-2 text-sm">Keyboard Shortcuts</h3>
      <div className="space-y-1 text-xs">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex justify-between gap-4 text-white/80">
            <span>{shortcut.description}</span>
            <kbd className="bg-white/10 px-2 py-1 rounded text-white/90">
              {shortcut.ctrl && 'Ctrl+'}
              {shortcut.shift && 'Shift+'}
              {shortcut.alt && 'Alt+'}
              {shortcut.key.toUpperCase()}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}


