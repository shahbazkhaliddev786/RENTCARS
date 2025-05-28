"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Users, Settings, Fuel } from "lucide-react"
import type { RootState } from "@/lib/store"
import { setCars } from "@/lib/features/cars-slice"
import { addBooking } from "@/lib/features/booking-slice"
import { useToast } from "@/lib/hooks/use-toast"
import { setLocation, setPickupDate, setReturnDate } from "@/lib/features/search-slice"

export default function PopularCars() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { toast } = useToast()
  const { cars } = useSelector((state: RootState) => state.cars)
  const { cars: allCars } = useSelector((state: RootState) => state.database)
  const { location, pickupDate, returnDate } = useSelector((state: RootState) => state.search)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Initialize with all cars if no search has been performed
    if (cars.length === 0) {
      dispatch(setCars(allCars))
    }
  }, [cars.length, allCars, dispatch])

  const handleRentNow = (car: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to book a car.",
        variant: "error",
      })
      return
    }

    if (!pickupDate || !returnDate) {
      toast({
        title: "Please select dates",
        description: "Please select pickup and return dates to proceed with booking.",
        variant: "error",
      })
      return
    }

    // Calculate total price (simplified calculation)
    const days = Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = car.price * days

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user!.id,
      carId: car.id,
      location: location || car.location,
      pickupDate,
      returnDate,
      totalPrice,
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
    }

    dispatch(addBooking(booking))

    toast({
      title: "Booking confirmed!",
      description: `Your ${car.name} has been booked successfully. Total: $${totalPrice}`,
      variant: "success",
    })
  }

  const handleShowAllVehicles = () => {
    router.push("/rental-deals")
  }

  const displayCars = cars.length > 0 ? cars : allCars

  return (
    <section id="popular-cars" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">
            {cars.length > 0 && cars.length !== allCars.length ? "SEARCH RESULTS" : "POPULAR RENTAL DEALS"}
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            {cars.length > 0 && cars.length !== allCars.length
              ? `Found ${cars.length} cars`
              : "Most popular cars rental deals"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
            >
              <Image
                src={car.image || "/placeholder.svg"}
                alt={car.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{car.name}</h3>
                  <p className="text-sm text-gray-500">
                    {car.type} • {car.location}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{car.rating}</span>
                  <span className="text-sm text-gray-500">({car.reviews} reviews)</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{car.passengers} Passagers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuel}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${car.price}</span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    <Button onClick={() => handleRentNow(car)} className="bg-blue-600 hover:bg-blue-700">
                      Rent Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars found matching your search criteria.</p>
            <Button
              onClick={() => {
                dispatch(setCars(allCars))
                dispatch(setLocation(""))
                dispatch(setPickupDate(""))
                dispatch(setReturnDate(""))
              }}
              variant="outline"
              className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Show All Cars
            </Button>
          </div>
        )}

        <div className="text-center mt-8">
          <Button
            onClick={handleShowAllVehicles}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Show all vehicles →
          </Button>
        </div>
      </div>
    </section>
  )
}
