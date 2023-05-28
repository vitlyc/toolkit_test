import { createSlice } from "@reduxjs/toolkit"

export interface PaginationState {
  activePage: number
  searchText: string
}

export const initialPaginationState: PaginationState = {
  activePage: 1,
  searchText: "",
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: initialPaginationState,
  reducers: {
    updateActivePage(state, action) {
      state.activePage = action.payload
    },

    updateSearchText(state, action) {
      state.searchText = action.payload
    },
  },
})

export const paginationActions = paginationSlice.actions
