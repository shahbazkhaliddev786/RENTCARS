"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MobileApp() {
  const router = useRouter()

  const handleStartRenting = () => {
    router.push("/become-renter")
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-blue-600 font-medium mb-2">MOBILE EXPERIENCE</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rentcars Mobile
                <br />
                Experience <span className="text-blue-600">SIMPLIFIED</span>
              </h2>
              <p className="text-gray-600">For faster, easier booking and exclusive deals.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartRenting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Start Renting Today
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/phone-mockup.png"
              alt="Mobile app mockup"
              width={300}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
