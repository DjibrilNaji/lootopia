import { User } from "lucide-react"
import { cn } from "~/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface AvatarProps {
  image?: string
  className?: string
}

export function AvatarComponent({ image, className }: AvatarProps) {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={image} className="object-cover" />

      <AvatarFallback>
        <div className="flex size-9 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
          <User className={cn(className)} />
        </div>
      </AvatarFallback>
    </Avatar>
  )
}
