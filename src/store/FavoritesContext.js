import React, { createContext, useReducer, useContext } from 'react';

// 1. Buat Context
const FavoritesContext = createContext();

// 2. Action types
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

// 3. Reducer function
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      // Cegah duplikat
      if (state.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    case REMOVE_FAVORITE:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

// 4. Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  const addFavorite = (show) => {
    dispatch({ type: ADD_FAVORITE, payload: show });
  };

  const removeFavorite = (id) => {
    dispatch({ type: REMOVE_FAVORITE, payload: id });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// 5. Custom hook untuk kemudahan
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};