import {useState, useEffect, useRef} from 'react';

export type UseSearchValueHookReturnType = [
  string,
  string,
  (s: string) => void,
];

export const useSearchValue = (
  defaultValue: string,
  updateInterval: number = 8e2,
): UseSearchValueHookReturnType => {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [searchValue, setSearchValue] = useState(innerValue);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerId?.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      setSearchValue(innerValue);
    }, updateInterval);
  }, [innerValue]);

  return [searchValue, innerValue, setInnerValue];
};