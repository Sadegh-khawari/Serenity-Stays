import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("storage")); // Force update
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [value, key]);

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === key) {
        setValue(event.newValue ? JSON.parse(event.newValue) : initialState);
      }
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialState]);

  return [value, setValue];
}
