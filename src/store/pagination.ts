import { createSlice } from "@reduxjs/toolkit"

export interface PaginationState {
  activePage: number
  pageInfo: PageInfo | null
  searchText: string
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  __typename: string
}

export const initialPaginationState: PaginationState = {
  activePage: 1,
  pageInfo: null,
  searchText: "",
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: initialPaginationState,
  reducers: {
    updateActivePage(state, action) {
      state.activePage = action.payload
    },
    setFirstPage(state) {
      state.activePage = 1
    },
    updatePageInfo(state, action) {
      state.pageInfo = action.payload
    },
    updateSearchText(state, action) {
      state.searchText = action.payload
    },
  },
})

export const paginationActions = paginationSlice.actions
