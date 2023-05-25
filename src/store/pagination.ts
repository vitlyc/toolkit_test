import { createSlice } from "@reduxjs/toolkit"

export const initiaPaginationlState = { activePage: 1, pageInfo: null }

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: initiaPaginationlState,
  reducers: {
    updateActivePage(state, action) {
      state.activePage = action.payload
    },
    updatePageInfo(state, action) {
      state.pageInfo = action.payload
    },
  },
})

export const paginationActions = paginationSlice.actions
