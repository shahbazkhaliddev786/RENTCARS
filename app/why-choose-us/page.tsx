"use client"

import Image from "next/image"
import { Shield, Award, Truck, Headphones, Users, Star, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function WhyChooseUsPage() {
  const mainFeatures = [
    {
      icon: Shield,
      title: "Best Price Guaranteed",
      description: "Find a lower price? We'll refund you 100% of the difference.",
      details: "Our price match guarantee ensures you always get the best deal available in the market.",
    },
    {
      icon: Award,
      title: "Experienced Drivers",
      description: "Don't have a driver? Don't worry, we have many experienced drivers for you.",
      details: "All our drivers are professionally trained, licensed, and have years of experience.",
    },
    {
      icon: Truck,
      title: "24 Hour Car Delivery",
      description: "Book your car anytime and we will deliver it directly to you.",
      details: "Free delivery service available within city limits, with express delivery options.",
    },
    {
      icon: Headphones,
      title: "24/7 Technical Support",
      description: "Have a question? Contact RentCars support any time when you have a problem.",
      details: "Our dedicated support team is available round the clock to assist you.",
    },
  ]

  const additionalFeatures = [
    {
      icon: Users,
      title: "Trusted by 50,000+ Customers",
      description: "Join our community of satisfied customers worldwide.",
    },
    {
      icon: Star,
      title: "4.8/5 Average Rating",
      description: "Consistently rated as the top car rental service.",
    },
    {
      icon: Clock,
      title: "Quick 5-Minute Pickup",
      description: "Fast and efficient car pickup process.",
    },
    {
      icon: DollarSign,
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprise charges.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Exceptional service! The car was delivered on time and in perfect condition. The driver was professional and courteous.",
      image: "/images/customer1.png",
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, USA",
      rating: 5,
      text: "I've used RentCars multiple times and they never disappoint. Great selection of cars and unbeatable prices.",
      image: "/images/customer2.png",
    },
    {
      name: "Emily Davis",
      location: "Chicago, USA",
      rating: 5,
      text: "The 24/7 support is amazing. When I had an issue during my trip, they resolved it within minutes.",
      image: "/images/customer1.png",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "500+", label: "Cars Available" },
    { number: "100+", label: "Pickup Locations" },
    { number: "24/7", label: "Customer Support" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RentCars?</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best car rental experience with unmatched service and value.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features */}
          <div className="bg-white rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">More Reasons to Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Experience the Difference</h2>
            <p className="text-blue-100 mb-6">
              Join thousands of satisfied customers and discover why RentCars is the preferred choice for car rentals.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Your Car Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
