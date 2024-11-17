import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
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
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages, setLimit } = paginationSlice.actions;
export default paginationSlice.reducer;