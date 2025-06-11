"use client"

import { Link } from "@remix-run/react"
import routes from "../routes"
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link to={routes.home} className="flex items-center gap-2">
                <img src={routes.img.trasureNoBg} className="w-8" alt="LOOTOPIA" />
                <span className="font-uniSansItalic text-lg font-semibold">LOOTOPIA</span>
              </Link>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
