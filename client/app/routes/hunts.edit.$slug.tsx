"use client"

import { json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useParams } from "react-router-dom"
import { EditHuntComponent } from "~/client/components/hunt/EditHuntComponent"
import { requireUser } from "~/client/utils/auth"

export const loader = async (args: LoaderFunctionArgs) => {
  const user = await requireUser(args)

  return json({ user })
}

export default function EditHuntPage() {
  const params = useParams()
  const { user } = useLoaderData<typeof loader>()

  const { slug } = params

  if (!slug) {
    return <div>Chasse introuvable</div>
  }

  const userEmail = user.sub

  return <EditHuntComponent slug={slug} email={userEmail} />
}
