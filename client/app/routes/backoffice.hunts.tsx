"use client"

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Eye, Loader2, Lock, MapPin } from "lucide-react"
import { useState } from "react"
import { MapDialog } from "~/client/components/admin/MapDialog"
import { Badge } from "~/client/components/ui/badge"
import { Input } from "~/client/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "~/client/components/ui/table"
import { useCustomQuery } from "~/client/hook/useCustomMutation"
import { getHunts } from "~/client/services/hunt"
import { requireUser } from "~/client/utils/auth"
export const meta: MetaFunction = () => [
  { title: "Back Office - Chasses" },
  { name: "description", content: "Gestion des chasses au trésor" }
]

export const loader = async (args: LoaderFunctionArgs) => {
  return await requireUser(args)
}

export default function BackofficeHuntsPage() {
  const { isLoading, data: hunts, error } = useCustomQuery(["hunts"], () => getHunts())
  const [search, setSearch] = useState("")

  if (isLoading && !hunts)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des chasses...</span>
      </div>
    )

  if (error)
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">Erreur lors du chargement des chasses</p>
      </div>
    )

  const huntsList = hunts?.data ?? []
  const filtered = huntsList.filter((h) =>
    `${h.name} ${h.slug}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="mx-auto max-w-7xl space-y-6 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Chasses au Trésor</h1>

      <Input
        placeholder="Rechercher un nom ou slug..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Début</TableHead>
            <TableHead>Fin</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Coordonnées</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((hunt) => (
            <TableRow key={hunt.id}>
              <TableCell>{hunt.name}</TableCell>
              <TableCell>/{hunt.slug}</TableCell>
              <TableCell>{new Date(hunt.startDate).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>{new Date(hunt.endDate).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  {hunt.privateHunt ? (
                    <Lock className="h-4 w-4 text-orange-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-green-600" />
                  )}
                  <span>{hunt.privateHunt ? "Privée" : "Publique"}</span>{" "}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={hunt.draft ? "secondary" : "default"}>
                  {hunt.draft ? "Brouillon" : "Publié"}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>
                  {hunt.latitude.toFixed(4)}, {hunt.longitude.toFixed(4)}
                </span>
              </TableCell>
              <TableCell>
                <MapDialog latitude={hunt.latitude} longitude={hunt.longitude} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
