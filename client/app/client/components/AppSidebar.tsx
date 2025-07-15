import { data, Link, useLoaderData, useNavigate } from "@remix-run/react"
import { jwtDecode } from "jwt-decode"
import { AccountTabsEnum } from "~/types/account"
import { UserPayload } from "~/types/user"
import { useCustomQuery } from "../hook/useCustomMutation"
import routes from "../routes"
import { logout } from "../services/auth"
import { getUser } from "../services/user"
import { AvatarComponent } from "./AvatarComponent"
import { Button } from "./ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "./ui/sidebar"
import Spinner from "./utils/Spinner"
import { VersionSwitcher } from "./VersionSwitcher"

const datas = {
  navMain: [
    {
      title: "Compte",
      items: [
        { title: "Informations personnelles", tab: AccountTabsEnum.PERSONAL_INFO },
        { title: "Changer le mot de passe", tab: AccountTabsEnum.UPDATE_PASSWORD },
        { title: "Notifications", tab: AccountTabsEnum.NOTIFICATIONS }
      ]
    },
    {
      title: "Paramètres avancés",
      items: [
        {
          title: "Désactiver/Supprimer le compte",
          tab: AccountTabsEnum.ACCOUNT_DESACTIVATION_DELETION
        }
      ]
    }
  ]
}

interface Cookies {
  [key: string]: string
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie") || ""

  const cookies: Cookies = cookieHeader.split(";").reduce((acc: Cookies, cookie: string) => {
    const [name, value] = cookie.trim().split("=")
    return { ...acc, [name]: value }
  }, {})

  const accessToken: string | undefined = cookies["accessToken"]
  const isLoggedIn: boolean = !!accessToken

  let userDecoded: UserPayload | null = null

  if (accessToken) {
    userDecoded = jwtDecode<UserPayload>(accessToken)
  }

  return data({
    isLoggedIn,
    user: userDecoded ?? null
  })
}

export function AppSidebar({
  setAccountTab,
  accountTab
}: {
  setAccountTab: (tab: AccountTabsEnum) => void
  accountTab: AccountTabsEnum
}) {
  const { user } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  const userEmail = user?.sub || user?.email || ""

  const handleLogout = async () => {
    await logout()
    navigate(routes.home)
  }

  const {
    isLoading,
    data: currentUser,
    error
  } = useCustomQuery(["user", userEmail], () => getUser(userEmail || ""))

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto flex w-full flex-col gap-2 p-6 lg:w-3/4">
          <p className="text-2xl text-red-500">
            Erreur lors de la récupération des données du compte.
          </p>

          <Link to="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {datas.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.tab === accountTab}>
                      <button onClick={() => setAccountTab(item.tab)}>{item.title}</button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {user?.isAdmin && (
          <Link
            to={routes.backoffice}
            className="mx-auto mb-2 w-fit rounded-lg bg-red-500 px-20 py-2 text-center text-sm text-white focus:outline-none focus:ring-4"
          >
            Backoffice
          </Link>
        )}
      </SidebarContent>

      <div className="mx-auto flex items-center gap-2 py-2">
        <AvatarComponent />
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">{currentUser.username}</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="mx-auto mb-2 w-fit rounded-lg bg-red-500 px-20 text-center text-sm text-white focus:outline-none focus:ring-4"
        onClick={handleLogout}
      >
        Déconnexion
      </Button>
      <SidebarRail />
    </Sidebar>
  )
}
