import { LoaderFunctionArgs } from "@remix-run/node"
import { useParams } from "@remix-run/react"
import { OneHunt } from "~/client/components/hunt/OneHunt"
import { requireUser } from "~/client/utils/auth"

export const loader = async (args: LoaderFunctionArgs) => {
  return await requireUser(args)
}

export default function UniqueHunt() {
  const params = useParams()

  if (!params.slug) return <p>No slug</p>

  return <OneHunt slug={params.slug} />
}
