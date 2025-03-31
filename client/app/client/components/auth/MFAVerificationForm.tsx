import { LoaderCircleIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { verifyMFA } from "~/client/services/auth"
import { Button } from "~/client/components/ui/button"
import { InputOTP, InputOTPSlot } from "~/client/components/ui/input-otp"

interface MFAVerificationFormProps {
  email: string
  onSuccess: () => void
  onBack: () => void
}

export function MFAVerificationForm({ email, onSuccess, onBack }: MFAVerificationFormProps) {
  const [inputCode, setInputCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await verifyMFA(email, inputCode)
      toast.success(response.customMessage)
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Code invalide")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vérification en 2 étapes</h2>
      <p>Entrez le code à 6 chiffres envoyé à {email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputOTP
          value={inputCode}
          onChange={setInputCode}
          maxLength={6}
          containerClassName="justify-center"
        >
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
        </InputOTP>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading || inputCode.length !== 6}>
            {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Vérifier"}
          </Button>
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
        </div>
      </form>
    </div>
  )
}
