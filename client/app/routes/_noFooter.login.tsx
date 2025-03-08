import { MetaFunction } from "@remix-run/node"
import { useLocation } from "@remix-run/react"
import { toast } from "sonner"
import { LayoutAuthForm } from "~/client/components/auth/LayoutAuthForm"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia - Connexion" }, { name: "description", content: "Connexion" }]
}

export default function LoginPage() {
  const { state } = useLocation()

  if (state?.codeVerified) {
    toast.success(state.codeVerified, {
      duration: 5000
    })
  }

  return <LayoutAuthForm>Login form...</LayoutAuthForm>
}
