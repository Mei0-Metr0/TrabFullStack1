import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonList } from "../services/apiService";

export const fetchAllPokemonNames = createAsyncThunk("pokemon/fetchAllPokemonNames", async () => {
  const allPokemon = await fetchPokemonList(0, 1025);
  return allPokemon.map((pokemon) => pokemon.name);
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    allPokemonNames: [],
    currentPage: 1,
    limit: 8,
    totalPages: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemonNames.fulfilled, (state, action) => {
      state.allPokemonNames = action.payload;
      state.totalPages = Math.ceil(action.payload.length / state.limit);
    });
  },
});

export const { setCurrentPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;