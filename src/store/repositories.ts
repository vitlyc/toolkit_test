import { createSlice } from "@reduxjs/toolkit"

export const initiaRepositorieslState = { repositories: [] }

export const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: initiaRepositorieslState,
  reducers: {
    updateRepositories(state, action) {
      state.repositories = action.payload
    },
  },
})

export const repositoriesActions = repositoriesSlice.actions
