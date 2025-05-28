"use client"

import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Wilson",
    location: "New York, USA",
    rating: 5,
    text: "I feel very secure when using caretall services. Your customer care team is very enthusiastic and the driver is always on time.",
    image: "/images/customer1.png",
  },
  {
    id: 2,
    name: "Charlie Johnson",
    location: "New York, USA",
    rating: 5,
    text: "I feel very secure when using caretall services. Your customer care team is very enthusiastic and the driver is always on time.",
    image: "/images/customer2.png",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What people say about us?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-2xl font-bold">5.0</span>
                    <span className="text-sm text-gray-500">stars</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{testimonial.text}</p>

              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
