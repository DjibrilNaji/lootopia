"use client"

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Loader2, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { DeleteUserDialog } from "~/client/components/admin/DeleteUserDialog"
import { EditUserDialog } from "~/client/components/admin/EditUserDialog"
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
import { getUsers } from "~/client/services/user"
import { requireUser } from "~/client/utils/auth"

export const meta: MetaFunction = () => [
  { title: "Back Office - Utilisateurs" },
  { name: "description", content: "Gestion des utilisateurs" }
]

export const loader = async (args: LoaderFunctionArgs) => {
  return await requireUser(args)
}

export default function BackofficeUsersPage() {
  const { isLoading, data: users, error } = useCustomQuery(["users"], getUsers)
  const [search, setSearch] = useState("")

  if (isLoading && !users)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des utilisateurs...</span>
      </div>
    )

  if (error)
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">Erreur lors du chargement des utilisateurs</p>
      </div>
    )

  const filtered =
    users?.filter((u) => `${u.username} ${u.email}`.toLowerCase().includes(search.toLowerCase())) ??
    []

  return (
    <main className="mx-auto max-w-7xl space-y-6 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Utilisateurs</h1>

      <Input
        placeholder="Rechercher un nom d'utilisateur ou email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom d&apos;utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>2FA</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>
                {user.twoFactorEnabled ? <ShieldCheck className="h-4 w-4 text-green-600" /> : "—"}
              </TableCell>
              <TableCell>
                <Badge variant={user.active ? "default" : "secondary"}>
                  {user.active ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.admin ? "default" : "secondary"}>
                  {user.admin ? "Administrateur" : "Utilisateur"}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                <EditUserDialog user={user} />
                <DeleteUserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
