import { Link } from "@remix-run/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/client/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "~/client/components/ui/avatar"
import { Button } from "~/client/components/ui/button"
import routes from "~/client/routes"

interface FaqItem {
  id: string
  question: string
  answer: string
}

interface FaqProps {
  items?: FaqItem[]
}

const faqItems = [
  {
    id: "faq-1",
    question: "Qu'est-ce que Lootopia ?",
    answer:
      "Lootopia est une plateforme immersive qui révolutionne la chasse au trésor en la rendant interactive et accessible à tous. Grâce à des technologies innovantes comme la réalité augmentée et la géolocalisation, elle permet de vivre des aventures uniques en solo ou en groupe, partout dans le monde."
  },
  {
    id: "faq-2",
    question: "Comment puis-je participer à une chasse au trésor sur Lootopia ?",
    answer:
      "1. **Téléchargez** l’application Lootopia sur votre smartphone ou accédez à la plateforme web.\n2. **Explorez** les différentes chasses disponibles autour de vous ou dans d'autres régions.\n3. **Lancez l'aventure** en suivant les indices, résolvant des énigmes et découvrant des trésors cachés.\n4. **Gagnez des récompenses** et partagez votre expérience avec la communauté !"
  },
  {
    id: "faq-3",
    question: "Comment puis-je organiser une chasse au trésor sur Lootopia ?",
    answer:
      "1. **Accédez** à l’espace créateur via l’application ou la plateforme web.\n2. **Définissez** votre parcours en choisissant des lieux, des énigmes et des défis adaptés à votre public.\n3. **Ajoutez** des éléments interactifs comme des objets en réalité augmentée et des messages audio/vidéo.\n4. **Lancez** votre chasse et suivez la progression des participants en temps réel !\n\n💡 **Lootopia propose aussi des services d’accompagnement** pour les entreprises souhaitant organiser des événements sur-mesure."
  },
  {
    id: "faq-4",
    question: "Quelles technologies Lootopia utilise-t-elle ?",
    answer:
      "Lootopia s’appuie sur un ensemble de technologies avancées :\n- **Réalité augmentée (AR)** pour une immersion totale.\n- **Géolocalisation** afin d’adapter les parcours aux lieux réels.\n- **Machine Learning** pour générer des défis intelligents.\n- **Blockchain** pour assurer la traçabilité des récompenses et objets virtuels."
  },
  {
    id: "faq-5",
    question: "Quels appareils sont compatibles avec Lootopia ?",
    answer:
      "Lootopia est disponible sur :\n- **Smartphones & tablettes** (iOS & Android) avec prise en charge de la réalité augmentée.\n- **Navigateurs web** pour la création et la gestion des chasses au trésor.\n- **Appareils AR & VR** (bientôt disponibles) pour une expérience encore plus immersive."
  }
]

export function Faq({ items = faqItems }: FaqProps) {
  return (
    <section className="flex items-center justify-center bg-gray-50 px-6 py-10 lg:px-2">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 font-uniSansItalic text-4xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            FAQ - Questions fréquentes
          </h2>
          <p className="text-gray-600 lg:text-lg">
            Tout ce que vous devez savoir sur notre application de chasse au trésor en réalité
            augmentée.
          </p>
        </div>
        <Accordion type="single" collapsible className="mx-auto w-full lg:max-w-3xl">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">{item.question}</div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-gray-600 lg:text-lg">{item.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-white p-8 text-center shadow-sm">
          <div className="relative mb-6">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            Besoin d&apos;aide supplémentaire ?
          </h3>
          <p className="mb-8 max-w-3xl text-gray-600 lg:text-lg">
            Notre équipe de support est disponible pour répondre à toutes vos questions et vous
            aider à profiter pleinement de l&apos;expérience.
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full bg-amber-400 text-white hover:bg-amber-500 sm:w-auto">
              <Link to={routes.contact}>Contacter le Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
