import { Outlet, useOutletContext } from "@remix-run/react"

import { Navbar } from "~/client/components/business/Header"
import { UserPayload } from "~/types/user"

export default function NoFooterLayout() {
  const { user } = useOutletContext<{ user: UserPayload | null }>()

  return (
    <>
      <Navbar />
      <Outlet context={{ user }} />
    </>
  )
}
