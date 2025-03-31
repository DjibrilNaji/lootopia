import { MetaFunction } from "@remix-run/node"
import { useNavigate } from "@remix-run/react"

import { LayoutAuthForm } from "~/client/components/auth/LayoutAuthForm"
import { LoginForm } from "~/client/components/auth/LoginForm"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia - Connexion" }, { name: "description", content: "Connexion" }]
}

export default function LoginPage() {
  const navigate = useNavigate()
  const handleLoginSuccess = () => {
    navigate("/")
  }

  return (
    <LayoutAuthForm>
      <LoginForm onSuccess={handleLoginSuccess}></LoginForm>
    </LayoutAuthForm>
  )
}
