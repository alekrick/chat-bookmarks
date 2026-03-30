"use client";

import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch {
      /* empty */
    }
    setHydrated(true);
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)): void => {
    setStoredValue((prev) => {
      const next = value instanceof Function ? value(prev) : value;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* quota exceeded */
      }
      return next;
    });
  };

  return [hydrated ? storedValue : initialValue, setValue];
};
