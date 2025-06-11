import { LoaderFunctionArgs } from "@remix-run/node"
import { json, Link, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import DesactivationPage from "~/client/components/account/DesactivationPage"
import { PersonalInfoForm } from "~/client/components/account/PersonalInfoForm"
import { UpdatePasswordForm } from "~/client/components/account/UpdatePasswordForm"
import { AppSidebar } from "~/client/components/AppSidebar"
import { Button } from "~/client/components/ui/button"
import { Separator } from "~/client/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/client/components/ui/sidebar"
import Spinner from "~/client/components/utils/Spinner"
import { useCustomQuery } from "~/client/hook/useCustomMutation"
import { getUser } from "~/client/services/user"
import { requireUser } from "~/client/utils/auth"
import { AccountTabsEnum } from "~/types/account"

export const loader = async (args: LoaderFunctionArgs) => {
  const user = await requireUser(args)
  return json({ user })
}

export default function Page() {
  const { user } = useLoaderData<typeof loader>()
  const userEmail = user.sub

  const [accountTab, setAccountTab] = useState(AccountTabsEnum.OVERVIEW)

  const { isLoading, data, error } = useCustomQuery(["hunts", userEmail], () => getUser(userEmail))

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
    <SidebarProvider>
      <AppSidebar accountTab={accountTab} setAccountTab={setAccountTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p>
            <span className="text-xl font-bold">Mon compte</span>
          </p>
        </header>

        {accountTab === AccountTabsEnum.OVERVIEW && <div>Overview</div>}
        {accountTab === AccountTabsEnum.ANALYSIS && <div>Analysis</div>}
        {accountTab === AccountTabsEnum.PERSONAL_INFO && <PersonalInfoForm user={data} />}
        {accountTab === AccountTabsEnum.UPDATE_PASSWORD && <UpdatePasswordForm email={userEmail} />}
        {accountTab === AccountTabsEnum.NOTIFICATIONS && <div>Notification</div>}
        {accountTab === AccountTabsEnum.ACCOUNT_DESACTIVATION_DELETION && (
          <DesactivationPage email={userEmail} />
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
