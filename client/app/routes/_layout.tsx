import { Outlet } from "@remix-run/react"
import { Navbar } from "~/client/components/buisness/Header"
import { Footer } from "~/client/components/buisness/Footer"

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
