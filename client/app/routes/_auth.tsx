import { Outlet } from "@remix-run/react"

import { Navbar } from "~/client/components/buisness/Header"

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
