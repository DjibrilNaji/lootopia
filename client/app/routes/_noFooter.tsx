import { Outlet } from "@remix-run/react"

import { Navbar } from "~/client/components/business/Header"

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
