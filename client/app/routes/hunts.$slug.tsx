import { useParams } from "@remix-run/react"
import { OneHunt } from "~/client/components/hunt/OneHunt"

export default function UniqueHunt() {
  const params = useParams()

  if (!params.slug) return <p>No slug</p>

  return <OneHunt slug={params.slug} />
}
