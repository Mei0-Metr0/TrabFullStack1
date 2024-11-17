import { configureStore } from "@reduxjs/toolkit";
import galleryPokemonReducer from "../slices/galleryPokemonSlice";
import dollarPokemonReducer from "../slices/dollarPokemonSlice";
import filterReducer from "../slices/filterSlice";

export const store = configureStore({
  reducer: {
    pokemon: galleryPokemonReducer,
    dollarPokemon: dollarPokemonReducer,
    filter: filterReducer,
  },
});