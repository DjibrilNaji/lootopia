import { Outlet } from "@remix-run/react"

import { Footer } from "~/client/components/business/Footer"
import { Navbar } from "~/client/components/business/Header"

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
