import { json, LoaderFunctionArgs } from "@remix-run/node"
import ListHunt from "~/client/components/hunt/ListHunt"
import { requireUser } from "~/client/utils/auth"

export const loader = async (args: LoaderFunctionArgs) => {
  const user = await requireUser(args)
  return json({ user })
}

export default function ListHuntPage() {
  return <ListHunt />
}
