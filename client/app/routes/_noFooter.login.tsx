import { MetaFunction } from "@remix-run/node"

import { LayoutAuthForm } from "~/client/components/auth/LayoutAuthForm"
import { LoginForm } from "~/client/components/auth/LoginForm"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia - Connexion" }, { name: "description", content: "Connexion" }]
}

export default function LoginPage() {
  return (
    <LayoutAuthForm>
      <LoginForm />
    </LayoutAuthForm>
  )
}
