"use client"

import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ToastProvider } from "@/components/toast-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastProvider>{children}</ToastProvider>
    </Provider>
  )
}
