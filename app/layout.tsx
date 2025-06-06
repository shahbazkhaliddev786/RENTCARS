import type React from "react"
import { Providers } from "@/components/providers"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
