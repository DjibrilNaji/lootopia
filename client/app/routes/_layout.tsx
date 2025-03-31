import { Outlet } from "@remix-run/react"
import { Navbar } from "~/client/components/business/Header"
import { Footer } from "~/client/components/business/Footer"

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
