"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, RotateCcw } from "lucide-react"
import { setSearchParams } from "@/lib/features/search-slice"
import { setCars } from "@/lib/features/cars-slice"
import type { RootState } from "@/lib/store"

export default function SearchForm() {
  const dispatch = useDispatch()
  const { cars: allCars, locations } = useSelector((state: RootState) => state.database)
  const [location, setLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  const handleSearch = () => {
    // Filter cars based on search criteria
    let filteredCars = allCars

    if (location) {
      filteredCars = filteredCars.filter(
        (car) =>
          car.location.toLowerCase().includes(location.toLowerCase()) ||
          car.name.toLowerCase().includes(location.toLowerCase()) ||
          car.brand.toLowerCase().includes(location.toLowerCase()),
      )
    }

    // Only show available cars
    filteredCars = filteredCars.filter((car) => car.available)

    dispatch(setSearchParams({ location, pickupDate, returnDate }))
    dispatch(setCars(filteredCars))

    // Scroll to results
    const resultsSection = document.getElementById("popular-cars")
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <Input
                placeholder="Search your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-gray-300"
                list="locations"
              />
              <datalist id="locations">
                {locations.map((loc, index) => (
                  <option key={index} value={loc} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Pick-up date
              </label>
              <Input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="border-gray-300"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Return date
              </label>
              <Input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="border-gray-300"
                min={pickupDate || new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
