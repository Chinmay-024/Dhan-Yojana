'use client';
import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    let stored;
    if (typeof window !== 'undefined') {
      stored = localStorage.getItem(key);
    }
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}
