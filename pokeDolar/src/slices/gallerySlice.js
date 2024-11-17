import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonList } from "../services/apiService";

export const fetchAllPokemonNames = createAsyncThunk(
  "gallery/fetchAllPokemonNames",
  async (_, { rejectWithValue }) => {
    try {
      const allPokemon = await fetchPokemonList(0, 1025);
      return allPokemon.map((pokemon) => pokemon.name);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    allPokemonNames: [],
    status: "idle", // idle, pending, fulfilled, rejected
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemonNames.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchAllPokemonNames.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.allPokemonNames = action.payload;
        state.error = null;
      })
      .addCase(fetchAllPokemonNames.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default gallerySlice.reducer;