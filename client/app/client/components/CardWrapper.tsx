import { cn } from "~/lib/utils"

export default function CardWrapper({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "m-auto flex w-11/12 max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl border bg-white p-16 shadow-xl transition-all duration-300 hover:shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  )
}
