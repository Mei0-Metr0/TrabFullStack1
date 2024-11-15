import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonList } from "../services/apiService";

export const fetchAllPokemonNames = createAsyncThunk("pokemon/fetchAllPokemonNames", async () => {
  const allPokemon = await fetchPokemonList(0, 1025); // Número total aproximado de Pokémon
  return allPokemon.map((pokemon) => pokemon.name);
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    allPokemonNames: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemonNames.fulfilled, (state, action) => {
      state.allPokemonNames = action.payload;
    });
  },
});

export default pokemonSlice.reducer;
