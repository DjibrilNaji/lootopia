import { ReactNode } from "react"

export default function Wrapper({
  children,
  isLoading = false,
  error = null
}: {
  children: ReactNode
  isLoading?: boolean
  error?: string | null
}) {
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Chargement en cours...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }
  return <div>{children}</div>
}
