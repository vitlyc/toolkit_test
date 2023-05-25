import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { repositoriesSlice } from "./repositories"
import { paginationSlice } from "./pagination"
import logger from "redux-logger"

const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    repositories: repositoriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
