"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, Calendar, Car, MapPin, DollarSign, Edit } from "lucide-react"
import Header from "@/components/header"

export default function ProfilePage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { bookings } = useSelector((state: RootState) => state.booking)
  const { cars } = useSelector((state: RootState) => state.database)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const userBookings = bookings.filter((booking) => booking.userId === user.id)

  const getCarDetails = (carId: number) => {
    return cars.find((car) => car.id === carId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
            <p className="text-xl text-gray-600">Manage your account and view your bookings</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Details
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  My Bookings ({userBookings.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* User Information */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Personal Information
                          </span>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-gray-500">First Name</label>
                            <p className="text-lg font-semibold text-gray-900">{user.firstName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Last Name</label>
                            <p className="text-lg font-semibold text-gray-900">{user.lastName}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </label>
                          <p className="text-gray-900">{user.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            Phone Number
                          </label>
                          <p className="text-gray-900">{user.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Member Since
                          </label>
                          <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Bookings</span>
                            <span className="text-2xl font-bold text-blue-600">{userBookings.length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Confirmed</span>
                            <span className="text-2xl font-bold text-green-600">
                              {userBookings.filter((b) => b.status === "confirmed").length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Spent</span>
                            <span className="text-2xl font-bold text-purple-600">
                              ${userBookings.reduce((total, booking) => total + booking.totalPrice, 0)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button onClick={() => router.push("/")} className="w-full bg-blue-600 hover:bg-blue-700">
                          Browse Cars
                        </Button>
                        <Button
                          onClick={() => router.push("/rental-deals")}
                          variant="outline"
                          className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          View Deals
                        </Button>
                        <Button onClick={() => router.push("/become-renter")} variant="outline" className="w-full">
                          Become a Renter
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      My Bookings
                    </CardTitle>
                    <CardDescription>View and manage your car rental bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userBookings.length === 0 ? (
                      <div className="text-center py-12">
                        <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-4">No bookings yet</p>
                        <p className="text-gray-400 mb-6">Start exploring our amazing car collection!</p>
                        <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                          Browse Cars
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {userBookings.map((booking) => {
                          const car = getCarDetails(booking.carId)
                          return (
                            <div
                              key={booking.id}
                              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-semibold text-xl text-gray-900">{car?.name || "Unknown Car"}</h3>
                                  <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                                </div>
                                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              </div>

                              <div className="grid md:grid-cols-3 gap-6 mb-6">
                                <div className="space-y-3">
                                  <h4 className="font-medium text-gray-900">Location & Dates</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <MapPin className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Location:</span>
                                      <span className="font-medium">{booking.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Calendar className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Pickup:</span>
                                      <span className="font-medium">
                                        {new Date(booking.pickupDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Calendar className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Return:</span>
                                      <span className="font-medium">
                                        {new Date(booking.returnDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-medium text-gray-900">Car Details</h4>
                                  <div className="space-y-2">
                                    <div className="text-sm">
                                      <span className="text-gray-600">Type:</span>
                                      <span className="font-medium ml-2">{car?.type}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-600">Passengers:</span>
                                      <span className="font-medium ml-2">{car?.passengers}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-600">Transmission:</span>
                                      <span className="font-medium ml-2">{car?.transmission}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-medium text-gray-900">Booking Info</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <DollarSign className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Total:</span>
                                      <span className="font-bold text-green-600">${booking.totalPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Calendar className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Booked:</span>
                                      <span className="font-medium">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4 border-t">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  Download Receipt
                                </Button>
                                {booking.status === "confirmed" && (
                                  <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                                    Cancel Booking
                                  </Button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
