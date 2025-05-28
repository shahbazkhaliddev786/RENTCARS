"use client"

import { useRouter } from "next/navigation"
import { MapPin, Calendar, Car, CreditCard, Key, RotateCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function HowItWorksPage() {
  const router = useRouter()

  const steps = [
    {
      icon: MapPin,
      title: "Choose Your Location",
      description: "Select your pickup location from our network of convenient locations across the city.",
      details: [
        "Over 100+ pickup locations",
        "Airport and city center locations",
        "GPS-enabled location finder",
        "Real-time availability",
      ],
    },
    {
      icon: Calendar,
      title: "Select Dates & Times",
      description: "Pick your rental dates and times that work best for your schedule.",
      details: [
        "Flexible pickup and return times",
        "Same-day booking available",
        "Extended rental periods",
        "Automatic reminders",
      ],
    },
    {
      icon: Car,
      title: "Choose Your Car",
      description: "Browse our extensive fleet and select the perfect car for your needs.",
      details: [
        "Economy to luxury vehicles",
        "Detailed car specifications",
        "Real customer reviews",
        "Instant availability check",
      ],
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Complete your booking with our secure payment system.",
      details: ["Multiple payment options", "Secure encryption", "Instant confirmation", "Digital receipts"],
    },
    {
      icon: Key,
      title: "Pick Up Your Car",
      description: "Arrive at your chosen location and collect your keys.",
      details: [
        "Quick 5-minute pickup process",
        "Digital key handover",
        "Pre-inspection completed",
        "24/7 customer support",
      ],
    },
    {
      icon: RotateCcw,
      title: "Return & Go",
      description: "Return the car at the end of your rental period.",
      details: ["Flexible return locations", "Quick return process", "Automatic billing", "Trip summary provided"],
    },
  ]

  const features = [
    {
      title: "Instant Booking",
      description: "Book your car in under 2 minutes with our streamlined process.",
    },
    {
      title: "24/7 Support",
      description: "Our customer support team is available around the clock to help you.",
    },
    {
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprise charges or hidden fees.",
    },
    {
      title: "Flexible Cancellation",
      description: "Cancel or modify your booking up to 24 hours before pickup.",
    },
  ]

  const handleStartBooking = () => {
    router.push("/")
  }

  const handleBecomeRenter = () => {
    router.push("/become-renter")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Renting a car has never been easier. Follow these simple steps to get on the road in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Process?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6">
              Join thousands of satisfied customers who trust RentCars for their transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleStartBooking}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Booking Now
              </Button>
              <Button
                onClick={handleBecomeRenter}
                variant="outline"
                className="border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Become a Renter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
