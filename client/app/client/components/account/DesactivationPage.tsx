"use client"

import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useCustomMutation } from "~/client/hook/useCustomMutation"
import { deleteAccount, desactivateAccount, logout } from "~/client/services/auth"
import { DesactivationRequestDto } from "~/types/api"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface DesactivationPageProps {
  email: string
}

export default function DesactivationPage({ email }: DesactivationPageProps) {
  const [password, setPassword] = useState("")
  const [confirmDesactivation, setConfirmDesactivation] = useState(false)
  const [confirmSuppression, setConfirmSuppression] = useState(false)
  const [error, setError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const desactivationMutation = useCustomMutation(
    async (desactivationRequestDto: DesactivationRequestDto) =>
      await desactivateAccount(desactivationRequestDto),
    {
      onSuccess: async (data) => {
        toast.success(data.customMessage)
        await logout("desactivateAccount=success")
      }
    }
  )

  const deleteMutation = useCustomMutation(
    async (desactivationRequestDto: DesactivationRequestDto) =>
      await deleteAccount(desactivationRequestDto),
    {
      onSuccess: async (data) => {
        toast.success(data.customMessage)
        await logout("deleteAccount=success")
      }
    }
  )

  const handleDesactivation = async () => {
    if (!confirmDesactivation) {
      setError("Veuillez confirmer que vous comprenez les conséquences de la désactivation.")
      return
    }

    if (!password) {
      setError("Veuillez saisir votre mot de passe pour confirmer.")
      return
    }

    desactivationMutation.mutate({ email, password })
  }

  const handleSuppression = () => {
    if (!confirmSuppression) {
      setIsDialogOpen(false)
      setError("Veuillez confirmer que vous comprenez les conséquences de la désactivation.")
      return
    }

    if (!password) {
      setIsDialogOpen(false)
      setError("Veuillez saisir votre mot de passe pour confirmer.")
      return
    }

    deleteMutation.mutate({ email, password })
  }

  return (
    <div className="justify-center bg-gray-50 p-4">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div>
            <CardTitle className="text-2xl font-bold">Gestion du compte</CardTitle>
            <CardDescription>Désactivez ou supprimez définitivement votre compte</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information importante</AlertTitle>
            <AlertDescription>
              La désactivation et la suppression de compte sont des actions qui peuvent avoir des
              conséquences importantes. Veuillez lire attentivement les informations ci-dessous
              avant de procéder.
            </AlertDescription>
          </Alert>

          {error && (
            <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="motDePasse">Mot de passe actuel</Label>
            <Input
              id="motDePasse"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe pour confirmer"
              required
            />
          </div>

          <div className="space-y-4 rounded-md border p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
              <div>
                <h3 className="text-lg font-medium">Désactiver mon compte</h3>
                <p className="text-sm text-muted-foreground">
                  La désactivation de votre compte masquera temporairement votre profil et vos
                  données. Vous pourrez réactiver votre compte en vous connectant à nouveau dans les
                  30 jours. Après 30 jours d&apos;inactivité, votre compte sera définitivement
                  supprimé.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="confirmDesactivation"
                checked={confirmDesactivation}
                onCheckedChange={(checked) => setConfirmDesactivation(checked as boolean)}
              />
              <Label htmlFor="confirmDesactivation" className="text-sm font-normal">
                Je comprends que mon compte sera désactivé et que je dispose de 30 jours pour le
                réactiver.
              </Label>
            </div>

            <Button
              variant="outline"
              className="w-full border-amber-500 text-amber-700 hover:bg-amber-50"
              onClick={handleDesactivation}
            >
              Désactiver mon compte
            </Button>
          </div>

          {/* Section Suppression */}
          <div className="space-y-4 rounded-md border border-red-200 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
              <div>
                <h3 className="text-lg font-medium">Supprimer définitivement mon compte</h3>
                <p className="text-sm text-muted-foreground">
                  La suppression de votre compte est <strong>irréversible</strong>. Toutes vos
                  données personnelles, publications et activités seront définitivement effacées de
                  notre système. Cette action ne peut pas être annulée.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="confirmSuppression"
                checked={confirmSuppression}
                onCheckedChange={(checked) => setConfirmSuppression(checked as boolean)}
              />
              <Label htmlFor="confirmSuppression" className="text-sm font-normal">
                Je comprends que la suppression de mon compte est définitive et que toutes mes
                données seront perdues.
              </Label>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Supprimer définitivement mon compte
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmation de suppression</DialogTitle>
                  <DialogDescription>
                    Êtes-vous absolument certain de vouloir supprimer définitivement votre compte ?
                    Cette action est irréversible et toutes vos données seront perdues.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm font-medium text-red-600">
                    Pour confirmer, tapez &quot;SUPPRIMER&quot; ci-dessous:
                  </p>
                  <Input className="mt-2" placeholder="SUPPRIMER" />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={handleSuppression}>
                    Confirmer la suppression
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
