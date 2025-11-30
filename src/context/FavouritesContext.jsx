import { createContext, useEffect, useState } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // ADD (prevents duplicates)
  const addFavourite = (property) => {
    if (!favourites.some((p) => p.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  // REMOVE by ID
  const removeFavourite = (id) => {
    setFavourites(favourites.filter((p) => p.id !== id));
  };

  // CLEAR ALL
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}