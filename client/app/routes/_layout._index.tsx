import type { MetaFunction } from "@remix-run/node"
import { useSearchParams } from "@remix-run/react"
import { Check } from "lucide-react"

import { Faq } from "~/client/components/business/FAQ"
import { Feature } from "~/client/components/business/Feature"
import { Hero } from "~/client/components/business/Hero"
import { Testimonial } from "~/client/components/business/Testimonial"
import { Work } from "~/client/components/business/WorkPage"
import Wrapper from "~/client/components/Wrapper"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia" }, { name: "Lootopia", content: "Welcome to Lootopia!" }]
}

export default function Index() {
  const [searchParams] = useSearchParams()
  const updateEmail = searchParams.get("updateEmail")

  return (
    <Wrapper isLoading={false} error={null}>
      {updateEmail === "success" && (
        <div className="flex items-center gap-5 bg-green-500 px-2 py-5 font-semibold text-white">
          <Check />
          <p className="flex flex-col">
            Votre adresse e-mail a été mise à jour avec succès. <span>Veuillez le vérifier.</span>
          </p>
        </div>
      )}

      <Hero />
      <Feature />
      <Work />
      <Faq />
      <Testimonial />
    </Wrapper>
  )
}
