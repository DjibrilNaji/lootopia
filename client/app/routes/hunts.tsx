import { Outlet } from "@remix-run/react"
import { Footer } from "~/client/components/business/Footer"
import { Navbar } from "~/client/components/business/Header"

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
