"use client"

import Image from "next/image"
import { Shield, Award, Truck, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Best price guaranteed",
    description: "Find a lower price? We'll refund you 100% of the difference.",
  },
  {
    icon: Award,
    title: "Experience driver",
    description: "Don't have driver? Don't worry, we have many experienced driver for you.",
  },
  {
    icon: Truck,
    title: "24 hour car delivery",
    description: "Book your car anytime and we will deliver it directly to you.",
  },
  {
    icon: Headphones,
    title: "24/7 technical support",
    description: "Have a question? Contact Rentcars support any time when you have problem.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/images/features-car.png"
              alt="Silver sports car"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-blue-600 font-medium mb-2">WHY CHOOSE US</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We offer the best experience with our rental deals
              </h2>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
