"use client"

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import SearchForm from "@/components/search-form"
import ProcessSteps from "@/components/process-steps"
import BrandLogos from "@/components/brand-logos"
import FeaturesSection from "@/components/features-section"
import PopularCars from "@/components/popular-cars"
import Testimonials from "@/components/testimonials"
import MobileApp from "@/components/mobile-app"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SearchForm />
      <ProcessSteps />
      <BrandLogos />
      <FeaturesSection />
      <PopularCars />
      <Testimonials />
      <MobileApp />
      <Footer />
    </div>
  )
}
