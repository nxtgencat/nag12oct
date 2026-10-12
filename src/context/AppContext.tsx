import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface AppContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  userName: string;
  setUserName: (n: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function initialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('stackly-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // storage unavailable — fall through
  }
  return 'light';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('stackly-user') ?? 'Guest';
    } catch {
      return 'Guest';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('stackly-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const handleName = useCallback((n: string) => {
    setUserName(n);
    try {
      localStorage.setItem('stackly-user', n);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, userName, setUserName: handleName }),
    [theme, toggleTheme, userName, handleName],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
