import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Booking {
  id: string
  userId: string
  carId: number
  location: string
  pickupDate: string
  returnDate: string
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: false,
}

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload)
      state.currentBooking = action.payload
    },
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload
    },
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: Booking["status"] }>) => {
      const booking = state.bookings.find((b) => b.id === action.payload.id)
      if (booking) {
        booking.status = action.payload.status
      }
    },
  },
})

export const { setLoading, addBooking, setCurrentBooking, updateBookingStatus } = bookingSlice.actions
export default bookingSlice.reducer
