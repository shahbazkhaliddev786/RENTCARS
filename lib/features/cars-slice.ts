import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Car {
  id: number
  name: string
  type: string
  rating: number
  reviews: number
  passengers: number
  transmission: string
  fuel: string
  price: number
  image: string
}

interface CarsState {
  cars: Car[]
  selectedCar: Car | null
  loading: boolean
}

const initialState: CarsState = {
  cars: [],
  selectedCar: null,
  loading: false,
}

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload
    },
    selectCar: (state, action: PayloadAction<Car>) => {
      state.selectedCar = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setCars, selectCar, setLoading } = carsSlice.actions
export default carsSlice.reducer
