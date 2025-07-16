"use client"

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Loader2, Mail, MessageCircle, UserCircle } from "lucide-react"
import { useState } from "react"
import { Badge } from "~/client/components/ui/badge"
import { Button } from "~/client/components/ui/button"
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
import { getContacts } from "~/client/services/contact"
import { requireUser } from "~/client/utils/auth"

export const meta: MetaFunction = () => [
  { title: "Back Office - Messages" },
  { name: "description", content: "Gestion des messages de contact" }
]

export const loader = async (args: LoaderFunctionArgs) => {
  return await requireUser(args)
}

export default function BackofficeContactsPage() {
  const { isLoading, data: contacts, error } = useCustomQuery(["contacts"], getContacts)
  const [search, setSearch] = useState("")

  if (isLoading && !contacts)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des messages...</span>
      </div>
    )

  if (error)
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">Erreur lors du chargement des messages</p>
      </div>
    )

  const contactList = contacts.data ?? []
  const filtered = contactList.filter((c) =>
    `${c.name} ${c.email} ${c.subject}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="mx-auto max-w-7xl space-y-6 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Messages de Contact</h1>

      <Input
        placeholder="Rechercher un nom, email ou sujet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Sujet</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <UserCircle className="h-4 w-4 text-blue-600" />
                  <span>{contact.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>{contact.email}</span>
                </div>
              </TableCell>
              <TableCell>{contact.subject}</TableCell>
              <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
              <TableCell>{new Date(contact.createdAt).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>
                <Badge variant={contact.status === "RESOLVED" ? "default" : "secondary"}>
                  {contact.status === "RESOLVED" ? "Résolu" : "En attente"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" disabled>
                  <MessageCircle className="mr-1 h-4 w-4" />
                  Voir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
