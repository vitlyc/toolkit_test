import { createSlice } from "@reduxjs/toolkit"

export interface PaginationState {
  activePage: number
  pageInfo: PageInfo | null
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  __typename: string
}

export const initialPaginationState: PaginationState = { activePage: 1, pageInfo: null }

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
  },
})

export const paginationActions = paginationSlice.actions
