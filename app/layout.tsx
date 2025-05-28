import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ToastProvider } from "@/components/toast-provider"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
