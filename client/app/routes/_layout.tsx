import { Outlet } from "@remix-run/react"

import { Footer } from "~/client/components/buisness/Footer"
import { Navbar } from "~/client/components/buisness/Header"

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
