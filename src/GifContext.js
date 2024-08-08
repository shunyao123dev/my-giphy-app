import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  gifs: [],
  loading: true,
  searchTerm: "",
  savedGifs: JSON.parse(localStorage.getItem("savedGifs")) || [],
  likedGifs: JSON.parse(localStorage.getItem("likedGifs")) || [],
};

const gifReducer = (state, action) => {
  switch (action.type) {
    case "SET_GIFS":
      return {
        ...state,
        gifs: action.payload,
        loading: false,
      };
    case "ADD_GIFS":
      return {
        ...state,
        gifs: [...state.gifs, ...action.payload],
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "TOGGLE_SAVE_GIF":
      const updatedSavedGifs = state.savedGifs.some(
        (gif) => gif.id === action.payload.id
      )
        ? state.savedGifs.filter((gif) => gif.id !== action.payload.id)
        : [...state.savedGifs, action.payload];
      localStorage.setItem("savedGifs", JSON.stringify(updatedSavedGifs));
      return {
        ...state,
        savedGifs: updatedSavedGifs,
      };

    case "TOGGLE_LIKE_GIF":
      const updatedLikedGifs = state.likedGifs.some(
        (gif) => gif.id === action.payload.id
      )
        ? state.likedGifs.filter((gif) => gif.id !== action.payload.id)
        : [...state.likedGifs, action.payload];
      localStorage.setItem("likedGifs", JSON.stringify(updatedLikedGifs));
      return {
        ...state,
        likedGifs: updatedLikedGifs,
      };
    default:
      return state;
  }
};

export const GifContext = createContext();

export const GifProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gifReducer, initialState);

  useEffect(() => {
    localStorage.setItem("savedGifs", JSON.stringify(state.savedGifs));
    localStorage.setItem("likedGifs", JSON.stringify(state.likedGifs));
  }, [state.savedGifs, state.likedGifs]);

  return (
    <GifContext.Provider value={{ state, dispatch }}>
      {children}
    </GifContext.Provider>
  );
};
