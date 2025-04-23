import { ArrowLeft } from "lucide-react"

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex w-fit cursor-pointer items-center gap-2"
    >
      <ArrowLeft />
      <span>Retour</span>
    </button>
  )
}
