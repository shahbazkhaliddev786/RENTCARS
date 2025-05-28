"use client"

export default function BrandLogos() {
  const brands = ["HONDA", "JAGUAR", "NISSAN", "VOLVO", "AUDI", "ACURA"]

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
          {brands.map((brand, index) => (
            <div key={index} className="text-2xl font-bold text-gray-400">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
