import {
  BatteryCharging,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles
} from "lucide-react"

interface Reason {
  title: string
  description: string
  icon: React.ReactNode
}

interface FeatureProps {
  heading?: string
  reasons?: Reason[]
}

export function Feature({
  reasons = [
    {
      title: "Réalité Augmentée (RA)",
      description: "Expériences immersives avec  des éléments virtuels dans le monde réel.",
      icon: <GitPullRequest className="size-6" />
    },
    {
      title: "Géolocalisation en Temps Réel",
      description: "Découvrez des caches cachées grâce à une géolocalisation précise.",
      icon: <SquareKanban className="size-6" />
    },
    {
      title: "Création de Contenu",
      description: "Créez des parcours sur mesure adaptés à vos besoins.",
      icon: <RadioTower className="size-6" />
    },
    {
      title: "Notifications Instantanées",
      description: "Recevez des alertes et des indices en temps réel.",
      icon: <WandSparkles className="size-6" />
    },
    {
      title: "Classement et Récompenses",
      description: "Compétitionnez avec d'autres participants et gagnez des récompenses.",
      icon: <Layers className="size-6" />
    },
    {
      title: "Communauté et Partage",
      description: "Interagissez avec d'autres chasseurs de trésors et partagez vos expériences.",
      icon: <BatteryCharging className="size-6" />
    }
  ]
}: FeatureProps) {
  return (
    <section className="flex items-center justify-center bg-gray-100 px-6 py-32 sm:px-4 lg:px-2">
      <div className="container">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center font-uniSans text-3xl font-semibold lg:text-5xl">
            Découvrez une expérience
            <span className="italic text-amber-400"> immersive </span>
            qui transforme votre environnement
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-amber-50">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
