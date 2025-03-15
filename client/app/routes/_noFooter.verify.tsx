import { MetaFunction } from "@remix-run/node"
import { Link, useSearchParams } from "@remix-run/react"

import VerificationActivationCode from "~/client/components/auth/VerifcationActivationCode"
import CardWrapper from "~/client/components/CardWrapper"
import { Button } from "~/client/components/ui/button"
import routes from "~/client/routes"

export const meta: MetaFunction = () => {
  return [
    { title: "Lootopia - Vérification" },
    { name: "description", content: "Vérification du compte" }
  ]
}

export default function VerifyPage() {
  const [searchParams] = useSearchParams()
  const activationCode = searchParams.get("activationCode")
  const email = searchParams.get("email")

  if (!activationCode || !email)
    return (
      <CardWrapper className="border-red-300 bg-red-50 text-center">
        <img src={routes.img.trasureNoBg} alt="Remix" className="h-40 object-contain" />
        <p className="text-lg font-bold text-red-500">
          L&apos;activation du compte a échoué. Veuillez réessayer.
        </p>
        <Button className="bg-red-500 px-10 text-lg hover:bg-yellow-700">
          <Link to={routes.home}>Page d&apos;accueil</Link>
        </Button>
      </CardWrapper>
    )

  return <VerificationActivationCode activationCode={activationCode} email={email} />
}
