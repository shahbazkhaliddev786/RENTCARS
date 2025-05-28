import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./features/search-slice"
import carsReducer from "./features/cars-slice"
import authReducer from "./features/auth-slice"
import bookingReducer from "./features/booking-slice"
import databaseReducer from "./features/database-slice"

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cars: carsReducer,
    auth: authReducer,
    booking: bookingReducer,
    database: databaseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
