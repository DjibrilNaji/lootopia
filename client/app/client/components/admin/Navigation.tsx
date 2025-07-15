import { Link, useLocation } from "@remix-run/react"
import { Home, MapPin, MessageSquare, Users } from "lucide-react"
import { cn } from "~/lib/utils"

const navigation = [
  { name: "Accueil", href: "/backoffice", icon: Home },
  { name: "Utilisateurs", href: "/backoffice/users", icon: Users },
  { name: "Chasses", href: "/backoffice/hunts", icon: MapPin },
  { name: "Messages", href: "/backoffice/messages", icon: MessageSquare },
  { name: "Lootopia", href: "/", icon: Home }
]

export function Navigation() {
  const location = useLocation()

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-xl font-bold text-gray-900">Back Office</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                      isActive
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
