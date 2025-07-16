import { json, LoaderFunctionArgs, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import ListHunt from "~/client/components/hunt/ListHunt"
import routes from "~/client/routes"
import { requireUser } from "~/client/utils/auth"

export async function loader(args: LoaderFunctionArgs) {
  const user = await requireUser(args)
  const usernameInUrl = args.params.username

  if (!user || user.username !== usernameInUrl) {
    return redirect(routes.home)
  }

  return json({ user })
}

export default function ListHuntPage() {
  const { user } = useLoaderData<typeof loader>()

  return <ListHunt email={user.sub} />
}
