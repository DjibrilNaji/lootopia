import { LoaderFunctionArgs } from "@remix-run/node"
import ListPublicHunt from "~/client/components/hunt/ListPublicHunt"
import { requireUser } from "~/client/utils/auth"

export const loader = async (args: LoaderFunctionArgs) => {
  return await requireUser(args)
}

export default function ListHuntPage() {
  return <ListPublicHunt />
}
