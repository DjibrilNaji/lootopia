import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/client/components/ui/dialog"
import { useCustomMutation } from "~/client/hook/useCustomMutation"
import { deleteUser } from "~/client/services/user"
import { UserDto } from "~/types/api"
import { Button } from "../ui/button"

interface DeleteUserDialogProps {
  user: UserDto
}

export function DeleteUserDialog({ user }: DeleteUserDialogProps) {
  const queryClient = useQueryClient()
  const { isLoading, mutate } = useCustomMutation(async () => await deleteUser(user.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"])
      toast.success("Utilisateur supprimé avec succès.")
    }
  })

  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg bg-red-700 py-1 text-sm text-white">
        Supprimer
      </DialogTrigger>
      <DialogContent className="max-w-96 rounded-xl" aria-describedby={undefined}>
        <DialogHeader className="flex flex-col gap-4 text-left">
          <DialogTitle>Suppression de l&apos;utilisateur {user.username}</DialogTitle>

          <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</p>
          <div className="flex justify-end">
            <Button variant="outline" className="mr-2">
              Annuler
            </Button>
            <Button variant="destructive" onClick={mutate} disabled={isLoading}>
              Supprimer
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
