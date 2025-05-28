"use client"

import { MapPin, Calendar, Car } from "lucide-react"

const steps = [
  {
    icon: MapPin,
    title: "Choose location",
    description: "Choose your and find your best car",
  },
  {
    icon: Calendar,
    title: "Pick-up date",
    description: "Select your pick-up date and time to book your car",
  },
  {
    icon: Car,
    title: "Book your car",
    description: "Book your car and we will deliver it directly to you",
  },
]

export default function ProcessSteps() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">HOW IT WORK</p>
          <h2 className="text-3xl font-bold text-gray-900">Rent with following 3 working steps</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
