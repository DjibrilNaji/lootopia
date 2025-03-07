import routes from "~/client/routes"

interface LayoutAuthFormProps {
  children: React.ReactNode
}

export function LayoutAuthForm({ children }: LayoutAuthFormProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="hidden h-full md:w-1/2 lg:flex">
        <img src={routes.img.lootopia} alt="lootopia" className="object-cover brightness-75" />
      </div>

      <div className="m-10 flex h-full flex-col items-center justify-center md:w-1/2">
        {children}
      </div>
    </div>
  )
}
