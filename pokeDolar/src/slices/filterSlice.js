import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchQuery: "",
    selectedType: 0,
    typeFilteredPokemon: []
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setPokemonTypes: (state, action) => {
      state.typeFilteredPokemon = action.payload;
    }
  }
});

export const { setSearchQuery, setSelectedType, setPokemonTypes } = filterSlice.actions;
export default filterSlice.reducer;