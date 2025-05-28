"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold">RENTCARS</span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>25566 Hc 1, Glenallen, Alaska, 99588, USA</p>
            <p>+603 4784 273 12</p>
            <p>rentcars@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>Copyright 2023 • All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
