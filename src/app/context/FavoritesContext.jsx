import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Cargar favoritos desde localStorage al inicio
    const storedFavorites = localStorage.getItem('favocities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favocities', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    const exists = favorites.some(
      (fav) => fav.name === city.name && fav.country === city.country
    );
    if (!exists) {
      setFavorites((prev) => [...prev, city]);
    }
  };

  const removeFavorite = (name, country) => {
    setFavorites((prev) =>
      prev.filter((city) => !(city.name === name && city.country === country))
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
