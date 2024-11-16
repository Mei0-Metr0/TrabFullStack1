import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDollarRate, fetchPokemonByNumber } from "../services/apiService";

export const fetchDollarPokemon = createAsyncThunk(
  "pokemon/fetchDollarPokemon",
  async () => {
    const { exchangeRate, pokemonNumber } = await fetchDollarRate();
    const pokemonData = await fetchPokemonByNumber(pokemonNumber);
    return { pokemonData, exchangeRate };
  }
);

const dollarPokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    dollarPokemon: null,
    exchangeRate: null,
    status: "idle", // idle, pending, fulfilled, rejected
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDollarPokemon.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchDollarPokemon.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.dollarPokemon = action.payload.pokemonData;
        state.exchangeRate = action.payload.exchangeRate;
      })
      .addCase(fetchDollarPokemon.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default dollarPokemonSlice.reducer;