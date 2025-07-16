import { Outlet } from "@remix-run/react"
import { Navigation } from "~/client/components/admin/Navigation"

export default function BackofficeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Outlet />
    </div>
  )
}
