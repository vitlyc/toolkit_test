import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Repository {
  owner: {
    login: string
    __typename: string
  }
  name: string
  url: string
  stargazerCount: number
  updatedAt: string
  __typename: string
}

interface RepositoriesState {
  repositories: Repository[]
  isLoading: boolean
  error: boolean
}

const initialRepositoriesState: RepositoriesState = {
  repositories: [],
  isLoading: false,
  error: false,
}

export const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: initialRepositoriesState,
  reducers: {
    setRepositories: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    },
  },
})

export const repositoriesActions = repositoriesSlice.actions

export default repositoriesSlice.reducer
