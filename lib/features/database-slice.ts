import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  createdAt: string
}

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
  brand: string
  year: number
  available: boolean
  location: string
}

interface RentalDeal {
  id: string
  title: string
  description: string
  discount: number
  validUntil: string
  carIds: number[]
  image: string
}

interface DatabaseState {
  users: User[]
  cars: Car[]
  rentalDeals: RentalDeal[]
  locations: string[]
}

const initialState: DatabaseState = {
  users: [],
  cars: [
    {
      id: 1,
      name: "Jaguar XE L P250",
      type: "Sport",
      rating: 4.8,
      reviews: 2436,
      passengers: 4,
      transmission: "Auto",
      fuel: "Hybrid",
      price: 1800,
      image: "/images/jaguar-xe.png",
      brand: "Jaguar",
      year: 2023,
      available: true,
      location: "New York",
    },
    {
      id: 2,
      name: "Audi R8",
      type: "Sport",
      rating: 4.6,
      reviews: 1936,
      passengers: 2,
      transmission: "Auto",
      fuel: "Gasoline",
      price: 2300,
      image: "/images/audi-r8.png",
      brand: "Audi",
      year: 2023,
      available: true,
      location: "Los Angeles",
    },
    {
      id: 3,
      name: "BMW M3",
      type: "Sport",
      rating: 4.5,
      reviews: 2566,
      passengers: 4,
      transmission: "Auto",
      fuel: "Gasoline",
      price: 1600,
      image: "/images/bmw-m3.png",
      brand: "BMW",
      year: 2023,
      available: true,
      location: "Chicago",
    },
    {
      id: 4,
      name: "Lamborghini Huracan",
      type: "Sport",
      rating: 4.9,
      reviews: 2156,
      passengers: 2,
      transmission: "Auto",
      fuel: "Gasoline",
      price: 2500,
      image: "/images/lamborghini.png",
      brand: "Lamborghini",
      year: 2023,
      available: true,
      location: "Miami",
    },
    {
      id: 5,
      name: "Mercedes-Benz C-Class",
      type: "Luxury",
      rating: 4.7,
      reviews: 1876,
      passengers: 5,
      transmission: "Auto",
      fuel: "Hybrid",
      price: 1400,
      image: "/images/mercedes-c-class.png",
      brand: "Mercedes-Benz",
      year: 2023,
      available: true,
      location: "New York",
    },
    {
      id: 6,
      name: "Tesla Model S",
      type: "Electric",
      rating: 4.8,
      reviews: 3245,
      passengers: 5,
      transmission: "Auto",
      fuel: "Electric",
      price: 1900,
      image: "/images/tesla-model-s.png",
      brand: "Tesla",
      year: 2023,
      available: true,
      location: "San Francisco",
    },
  ],
  rentalDeals: [
    {
      id: "1",
      title: "Weekend Special",
      description: "Get 20% off on weekend rentals",
      discount: 20,
      validUntil: "2024-12-31",
      carIds: [1, 2, 3],
      image: "/images/weekend-deal.png",
    },
    {
      id: "2",
      title: "Luxury Collection",
      description: "15% off on luxury cars",
      discount: 15,
      validUntil: "2024-12-31",
      carIds: [2, 4, 5],
      image: "/images/luxury-deal.png",
    },
    {
      id: "3",
      title: "Electric Vehicle Promo",
      description: "25% off on electric vehicles",
      discount: 25,
      validUntil: "2024-12-31",
      carIds: [6],
      image: "/images/electric-deal.png",
    },
  ],
  locations: ["New York", "Los Angeles", "Chicago", "Miami", "San Francisco", "Boston", "Seattle", "Denver"],
}

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    updateCarAvailability: (state, action: PayloadAction<{ carId: number; available: boolean }>) => {
      const car = state.cars.find((c) => c.id === action.payload.carId)
      if (car) {
        car.available = action.payload.available
      }
    },
  },
})

export const { addUser, updateCarAvailability } = databaseSlice.actions
export default databaseSlice.reducer
