"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "ai-creative-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
    setIsLoaded(true);
  }, []);

  const saveFavorites = useCallback((newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const newFavorites = prev.includes(id)
          ? prev.filter((f) => f !== id)
          : [...prev, id];
        saveFavorites(newFavorites);
        return newFavorites;
      });
    },
    [saveFavorites]
  );

  const addFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        if (prev.includes(id)) return prev;
        const newFavorites = [...prev, id];
        saveFavorites(newFavorites);
        return newFavorites;
      });
    },
    [saveFavorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const newFavorites = prev.filter((f) => f !== id);
        saveFavorites(newFavorites);
        return newFavorites;
      });
    },
    [saveFavorites]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return {
    favorites,
    isLoaded,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
