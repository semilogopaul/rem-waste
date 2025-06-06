import { useState, useEffect } from "react";

const getInitialState = (query: string): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(getInitialState(query));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    setMatches(mediaQuery.matches); // Initial check

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
