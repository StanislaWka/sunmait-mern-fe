import { useState, useEffect } from 'react';

interface DebounceProps {
  value: string;
  delay: number;
}

export function useDebounce({ value, delay }: DebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
