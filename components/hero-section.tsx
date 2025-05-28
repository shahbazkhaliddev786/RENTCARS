"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  const handleRentNow = () => {
    router.push("/become-renter")
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find, book and
                <br />
                rent a car <span className="text-blue-600">Easily</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Get a car wherever and whenever you need it with your iOS and Android device.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleRentNow} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Rent a Car Now
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/hero-car.png"
              alt="Blue sports car"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
