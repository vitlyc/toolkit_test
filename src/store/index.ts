import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { repositoriesSlice } from "./repositories"
import { paginationSlice } from "./pagination"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
// import logger from "redux-logger"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}
const reducers = combineReducers({
  repositories: repositoriesSlice.reducer,
  pagination: paginationSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["register", "rehydrate"],
      },
    }),
})
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
