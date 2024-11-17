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
    limit: 12,
    totalPages: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
      // Reset para página 1 se a página atual for maior que o total de páginas
      if (state.currentPage > action.payload) {
        state.currentPage = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemonNames.fulfilled, (state, action) => {
      state.allPokemonNames = action.payload;
      state.totalPages = Math.ceil(action.payload.length / state.limit);
    });
  },
});

export const { setCurrentPage, setTotalPages } = pokemonSlice.actions;
export default pokemonSlice.reducer;