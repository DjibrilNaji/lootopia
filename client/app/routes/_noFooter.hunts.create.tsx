import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { CreatHuntForm } from "~/client/components/hunt/CreateHuntForm"
import { requireUser } from "~/client/utils/auth"

export const loader = async (args: LoaderFunctionArgs) => {
  const user = await requireUser(args)
  return json({ user })
}

export default function CreateHunt() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto flex h-full w-3/5 items-center justify-center">
      <CreatHuntForm user={user} />
    </div>
  )
}
