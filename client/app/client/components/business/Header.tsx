import { Link, NavLink, useNavigate, useOutletContext } from "@remix-run/react"
import { Menu } from "lucide-react"

import { Button } from "~/client/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/client/components/ui/sheet"
import { useCustomQuery } from "~/client/hook/useCustomMutation"
import routes from "~/client/routes"
import { logout } from "~/client/services/auth"
import { getUser } from "~/client/services/user"
import { UserPayload } from "~/types/user"
import { AvatarComponent } from "../AvatarComponent"

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface NavbarProps {
  logo?: {
    src: string
    alt: string
    title: string
  }
  menu?: MenuItem[]
  mobileExtraLinks?: {
    name: string
    url: string
  }[]
  auth?: {
    login: {
      text: string
      url: string
    }
    signup: {
      text: string
      url: string
    }
    isAuthenticated?: boolean
  }
}
export function Navbar({
  logo = {
    src: routes.img.trasureNoBg,
    alt: "LOOTOPIA",
    title: "LOOTOPIA"
  },
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: routes.contact },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" }
  ],
  auth = {
    login: { text: "Se connecter", url: routes.auth.login },
    signup: { text: "S'inscrire", url: routes.auth.register }
  }
}: NavbarProps) {
  const { isLoggedIn, user } = useOutletContext<{ isLoggedIn: boolean; user: UserPayload }>()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(routes.home)
  }

  const userEmail = user?.sub || user?.email || ""

  const { data } = useCustomQuery(["hunts", userEmail], () => getUser(userEmail), {
    enabled: isLoggedIn
  })

  return (
    <section className="flex items-center justify-center border-b py-4">
      <div className="container bg-white p-5">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to={routes.home} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="font-uniSansItalic text-lg font-semibold">{logo.title}</span>
            </Link>
          </div>
          <div className="flex gap-2">
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
                >
                  <Link to={routes.hunts.list}>Chasses publiques</Link>
                </Button>

                <Button
                  variant="outline"
                  className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
                >
                  <Link to={routes.hunts.myHunts(user.username)}>Mes chasses</Link>
                </Button>

                <Button
                  variant="outline"
                  className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
                  onClick={handleLogout}
                >
                  Déconnexion
                </Button>
                <NavLink to={routes.account}>
                  <AvatarComponent />
                </NavLink>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
                  asChild
                >
                  <Link to={auth.login.url}>{auth.login.text}</Link>
                </Button>
                <Button
                  variant="outline"
                  className="asChild mb-2 me-2 w-full rounded-lg border border-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900 sm:w-auto"
                >
                  <Link to={auth.signup.url}>{auth.signup.text}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={routes.home} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="font-uniSansItalic text-lg font-semibold">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={routes.home} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="font-uniSansItalic text-lg font-semibold">{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-6 flex flex-col gap-6">
                  {/* <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion> */}

                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <SheetClose asChild key={idx}>
                          <Link
                            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                            to={link.url}
                          >
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {isLoggedIn ? (
                      <>
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="asChild mb-2 me-2 w-full rounded-lg border border-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900 sm:w-auto"
                          >
                            <Link to={routes.hunts.create}>Créer une chasse</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
                            onClick={handleLogout}
                          >
                            Déconnexion
                          </Button>
                        </SheetClose>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="mb-2 me-2 w-full rounded-lg border px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
                          asChild
                        >
                          <Link to={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="mb-2 me-2 w-full rounded-lg border border-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900 sm:w-auto"
                          asChild
                        >
                          <Link to={auth.signup.url}>{auth.signup.text}</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <NavLink
                  to={routes.account}
                  className="mt-auto flex items-center justify-center gap-2"
                >
                  <AvatarComponent />
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{data?.username}</span>
                  </div>
                </NavLink>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}
