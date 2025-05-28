import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SearchState {
  location: string
  pickupDate: string
  returnDate: string
  isSearching: boolean
}

const initialState: SearchState = {
  location: "",
  pickupDate: "",
  returnDate: "",
  isSearching: false,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Omit<SearchState, "isSearching">>) => {
      state.location = action.payload.location
      state.pickupDate = action.payload.pickupDate
      state.returnDate = action.payload.returnDate
      state.isSearching = true
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
    },
    setPickupDate: (state, action: PayloadAction<string>) => {
      state.pickupDate = action.payload
    },
    setReturnDate: (state, action: PayloadAction<string>) => {
      state.returnDate = action.payload
    },
    clearSearch: (state) => {
      state.location = ""
      state.pickupDate = ""
      state.returnDate = ""
      state.isSearching = false
    },
  },
})

export const { setSearchParams, setLocation, setPickupDate, setReturnDate, clearSearch } = searchSlice.actions
export default searchSlice.reducer
