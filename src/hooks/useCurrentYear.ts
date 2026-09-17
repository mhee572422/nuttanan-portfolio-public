import { useState, useEffect } from 'react';

export function useCurrentYear() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Optionally update it periodically if the user leaves the tab open across new year
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 60000 * 60 * 24); // check once a day

    return () => clearInterval(interval);
  }, []);

  return year;
}
