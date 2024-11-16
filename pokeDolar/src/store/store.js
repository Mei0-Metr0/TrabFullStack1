import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../slices/pokemonSlice";
import dollarPokemonReducer from "../slices/dollarPokemonSlice";
import filterReducer from "../slices/filterSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    dollarPokemon: dollarPokemonReducer,
    filter: filterReducer,
  },
});