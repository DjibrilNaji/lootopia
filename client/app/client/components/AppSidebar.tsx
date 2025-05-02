import { useNavigate } from "@remix-run/react"
import { AccountTabsEnum } from "~/types/account"
import routes from "../routes"
import { logout } from "../services/auth"
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
import { VersionSwitcher } from "./VersionSwitcher"

const data = {
  navMain: [
    {
      title: "Dashboard",
      items: [
        { title: "Vue d'ensemble", tab: AccountTabsEnum.OVERVIEW },
        { title: "Analyse", tab: AccountTabsEnum.ANALYSIS }
      ]
    },
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
        { title: "Désactiver le compte", tab: AccountTabsEnum.ACCOUNT_DESACTIVATION },
        { title: "Supprimer le compte", tab: AccountTabsEnum.ACCOUNT_DELETION }
      ]
    }
  ]
}

export function AppSidebar({
  setAccountTab,
  accountTab
}: {
  setAccountTab: (tab: AccountTabsEnum) => void
  accountTab: AccountTabsEnum
}) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(routes.home)
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
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
      </SidebarContent>

      <div className="mx-auto flex items-center gap-2 py-2">
        <AvatarComponent />
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">Djibril Naji</span>
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
