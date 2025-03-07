import { MetaFunction } from "@remix-run/node"
import { useState } from "react"
import { LayoutAuthForm } from "~/client/components/auth/LayoutAuthForm"

import { Register } from "~/client/components/auth/RegisterForm"
import CardWrapper from "~/client/components/CardWrapper"
import routes from "~/client/routes"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia - Inscription" }, { name: "description", content: "Inscription" }]
}

export default function RegisterPage() {
  const [checkEmail, setCheckEmail] = useState(false)

  if (checkEmail) {
    return (
      <CardWrapper>
        <img src={routes.img.trasureNoBg} alt="Treasure" className="h-40 object-contain" />
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-center text-4xl font-bold">Vérifiez votre email</h1>
          <p className="text-center">
            Un email de vérification a été envoyé à votre adresse email.
          </p>
          <p className="text-center">
            Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre
            compte.
          </p>
        </div>
      </CardWrapper>
    )
  }

  return (
    <LayoutAuthForm>
      <Register setCheckEmail={setCheckEmail} />
    </LayoutAuthForm>
  )
}
