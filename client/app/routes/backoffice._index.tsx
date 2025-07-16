import { LoaderFunctionArgs } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { MapPin, MessageSquare, Users } from "lucide-react"
import { Button } from "~/client/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/client/components/ui/card"
import Spinner from "~/client/components/utils/Spinner"
import { useCustomQuery } from "~/client/hook/useCustomMutation"
import { getAllDataLength } from "~/client/services/user"
import { requireUser } from "~/client/utils/auth"

export const loader = async (args: LoaderFunctionArgs) => {
  return await requireUser(args)
}

export default function Index() {
  const { isLoading, data, error } = useCustomQuery(["lengths"], getAllDataLength)

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto flex w-full flex-col gap-2 p-6 lg:w-3/4">
          <p className="text-2xl text-red-500">Erreur lors de la récupération des données.</p>

          <Link to="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    )
  }
  const { users, hunts, contacts } = data

  return (
    <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos utilisateurs, chasses et messages depuis cette interface.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users}</div>
              <CardDescription>Gérer les comptes utilisateurs</CardDescription>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chasses</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hunts}</div>
              <CardDescription>Gérer les chasses au trésor</CardDescription>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts}</div>
              <CardDescription>Consulter les messages reçus</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      <p>En cours de développement</p>
    </main>
  )
}
