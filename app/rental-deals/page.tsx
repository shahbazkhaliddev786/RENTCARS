"use client"

import type React from "react"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/store"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Tag, Car, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { addBooking } from "@/lib/features/booking-slice"
import { setPickupDate, setReturnDate, setLocation } from "@/lib/features/search-slice"
import { useToast } from "@/lib/hooks/use-toast"
import Header from "@/components/header"

export default function RentalDealsPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { rentalDeals, cars, locations } = useSelector((state: RootState) => state.database)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { pickupDate, returnDate, location } = useSelector((state: RootState) => state.search)
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)
  const [bookingLocation, setBookingLocation] = useState(location || "")
  const [bookingPickupDate, setBookingPickupDate] = useState(pickupDate || "")
  const [bookingReturnDate, setBookingReturnDate] = useState(returnDate || "")

  const getDealsWithCars = () => {
    return rentalDeals.map((deal) => ({
      ...deal,
      cars: cars.filter((car) => deal.carIds.includes(car.id)),
    }))
  }

  const dealsWithCars = getDealsWithCars()

  const handleViewDeal = (dealId: string) => {
    setSelectedDeal(selectedDeal === dealId ? null : dealId)
  }

  const handleBookDealCar = (car: any, deal: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to book a car.",
        variant: "error",
      })
      return
    }

    if (!bookingPickupDate || !bookingReturnDate) {
      toast({
        title: "Please select dates",
        description: "Please select pickup and return dates to proceed with booking.",
        variant: "error",
      })
      return
    }

    // Update global search state
    dispatch(setPickupDate(bookingPickupDate))
    dispatch(setReturnDate(bookingReturnDate))
    if (bookingLocation) {
      dispatch(setLocation(bookingLocation))
    }

    // Calculate total price with discount
    const days = Math.ceil(
      (new Date(bookingReturnDate).getTime() - new Date(bookingPickupDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    const originalPrice = car.price * days
    const discountedPrice = Math.round(originalPrice * (1 - deal.discount / 100))

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user!.id,
      carId: car.id,
      location: bookingLocation || car.location,
      pickupDate: bookingPickupDate,
      returnDate: bookingReturnDate,
      totalPrice: discountedPrice,
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
    }

    dispatch(addBooking(booking))

    toast({
      title: "Deal booking confirmed!",
      description: `Your ${car.name} has been booked with ${deal.discount}% discount. Total: $${discountedPrice} (saved $${originalPrice - discountedPrice})`,
      variant: "success",
    })
  }

  const handleBookRegularCar = (car: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to book a car.",
        variant: "error",
      })
      return
    }

    if (!bookingPickupDate || !bookingReturnDate) {
      toast({
        title: "Please select dates",
        description: "Please select pickup and return dates to proceed with booking.",
        variant: "error",
      })
      return
    }

    // Update global search state
    dispatch(setPickupDate(bookingPickupDate))
    dispatch(setReturnDate(bookingReturnDate))
    if (bookingLocation) {
      dispatch(setLocation(bookingLocation))
    }

    // Calculate total price
    const days = Math.ceil(
      (new Date(bookingReturnDate).getTime() - new Date(bookingPickupDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    const totalPrice = car.price * days

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user!.id,
      carId: car.id,
      location: bookingLocation || car.location,
      pickupDate: bookingPickupDate,
      returnDate: bookingReturnDate,
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

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    if (email) {
      toast({
        title: "Newsletter subscription successful!",
        description: "Thank you for subscribing! You'll receive the latest deals and offers.",
        variant: "success",
      })
      // Reset form
      e.currentTarget.reset()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Rental Deals</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing deals and save money on your next car rental.
            </p>
          </div>

          {/* Date Selection Form */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4">Select Your Rental Dates</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Input
                  placeholder="Select location"
                  value={bookingLocation}
                  onChange={(e) => setBookingLocation(e.target.value)}
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
                  value={bookingPickupDate}
                  onChange={(e) => setBookingPickupDate(e.target.value)}
                  className="border-gray-300"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Return date
                </label>
                <Input
                  type="date"
                  value={bookingReturnDate}
                  onChange={(e) => setBookingReturnDate(e.target.value)}
                  className="border-gray-300"
                  min={bookingPickupDate || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dealsWithCars.map((deal) => (
              <div key={deal.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white">{deal.discount}% OFF</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-blue-600" />
                      {deal.title}
                    </CardTitle>
                    <CardDescription>{deal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Valid until {new Date(deal.validUntil).toLocaleDateString()}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        Available Cars ({deal.cars.length})
                      </h4>
                      <div className="space-y-2">
                        {deal.cars.slice(0, 3).map((car) => (
                          <div key={car.id} className="flex justify-between items-center text-sm">
                            <span>{car.name}</span>
                            <div className="text-right">
                              <span className="line-through text-gray-400">${car.price}</span>
                              <span className="ml-2 font-semibold text-green-600">
                                ${Math.round(car.price * (1 - deal.discount / 100))}
                              </span>
                            </div>
                          </div>
                        ))}
                        {deal.cars.length > 3 && (
                          <div className="text-sm text-gray-500">+{deal.cars.length - 3} more cars</div>
                        )}
                      </div>
                    </div>

                    <Button onClick={() => handleViewDeal(deal.id)} className="w-full bg-blue-600 hover:bg-blue-700">
                      {selectedDeal === deal.id ? "Hide Deal Cars" : "View Deal Cars"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Deal Cars Expanded View */}
                {selectedDeal === deal.id && (
                  <div className="mt-4 space-y-4">
                    {deal.cars.map((car) => (
                      <Card key={car.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="relative w-32 h-24">
                            <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900">{car.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {car.type} • {car.location}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                  <span>{car.passengers} passengers</span>
                                  <span>{car.transmission}</span>
                                  <span>{car.fuel}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-400 line-through">${car.price}/day</div>
                                <div className="text-lg font-bold text-green-600">
                                  ${Math.round(car.price * (1 - deal.discount / 100))}/day
                                </div>
                                <Badge className="bg-red-100 text-red-800 text-xs">Save {deal.discount}%</Badge>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleBookDealCar(car, deal)}
                              className="mt-3 bg-green-600 hover:bg-green-700"
                              size="sm"
                            >
                              Book with Deal
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* All Cars Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">All Available Cars</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{car.name}</span>
                      <Badge variant="outline">{car.type}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {car.brand} • {car.year} • {car.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-gray-900">${car.price}</span>
                        <span className="text-sm text-gray-500">/day</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">{car.rating}</span>
                        <span className="text-sm text-gray-500">({car.reviews})</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                      <span>{car.passengers} passengers</span>
                      <span>{car.transmission}</span>
                      <span>{car.fuel}</span>
                    </div>
                    <Button
                      onClick={() => handleBookRegularCar(car)}
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      Rent Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't Miss Out!</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to get notified about new deals and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
