import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/client/components/ui/dialog"
import { UserDto } from "~/types/api"
import { EditUserForm } from "./EditUserForm"

interface EditUserDialogProps {
  title?: string
  user: UserDto
}
export function EditUserDialog({ user }: EditUserDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg bg-brown py-1 text-sm text-white">
        Détails
      </DialogTrigger>
      <DialogContent className="max-w-96 rounded-xl" aria-describedby={undefined}>
        <DialogHeader className="flex flex-col gap-4 text-left">
          <DialogTitle>Détails de l&apos;utilisateur {user.username}</DialogTitle>

          <EditUserForm user={user} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
