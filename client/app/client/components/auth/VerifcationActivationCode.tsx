import { useNavigate } from "@remix-run/react"
import { LoaderCircleIcon } from "lucide-react"

import CardWrapper from "~/client/components/CardWrapper"
import { Button } from "~/client/components/ui/button"
import { useCustomMutation } from "~/client/hook/useCustomMutation"
import routes from "~/client/routes"
import { verifyAccount } from "~/client/services/auth"

interface VerificationActivationCodeProps {
  activationCode: string
  email: string
}

export default function VerificationActivationCode({
  activationCode,
  email
}: VerificationActivationCodeProps) {
  const navigate = useNavigate()

  const { isLoading, mutate } = useCustomMutation(
    async ({ email, activationCode }: { email: string; activationCode: string }) =>
      await verifyAccount(email, activationCode),
    {
      onSuccess: (data) => {
        navigate(routes.auth.login, { state: { codeVerified: data.customMessage } })
      }
    }
  )

  const handleSubmit = () => mutate({ email, activationCode })

  return (
    <CardWrapper className="text-center">
      <img src={routes.img.trasureNoBg} alt="Remix" className="h-40 object-contain" />
      <p>
        Vous avez utilisé cette adresse email pour créer un compte :
        <span className="font-bold"> {email}.</span>
      </p>
      <p>Veuillez vérifier votre email pour activer votre compte.</p>
      <Button
        className="bg-yellow-600 px-10 text-lg hover:bg-yellow-700"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading && <LoaderCircleIcon className="animate-spin" size={16} />}
        Vérifier mon email
      </Button>
    </CardWrapper>
  )
}
