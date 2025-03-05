/* eslint-disable jsx-a11y/media-has-caption */
import { ArrowUpRight } from "lucide-react"
import { Badge } from "../ui/badge"

interface HeroProps {
  badge?: string
  heading: string
  description: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
}

const Hero = ({
  badge = "✨ Find Your Treasure",
  description = "Vivez l'aventure avec Lootopia : votre plateforme de chasses au trésor en Réalité Augmentée.",
  buttons = {
    primary: {
      text: "Rejoignez l'aventure",
      url: "https://www.shadcnblocks.com"
    }
  }
}: HeroProps) => {
  return (
    <section className="py-32 px-6 lg:px-2 flex justify-center items-center ">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge className="my-4" variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight  font-uniSansItalic">
              La Chasse au <br />
              Trésor <span className="italic text-yellow-400">Réinventée</span>
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">{description}</p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <button className="w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </button>
              )}
            </div>
          </div>
          <video
            className="max-h-96 w-full rounded-md object-cover -rotate-90"
            src="/img/Hero.mp4"
            autoPlay
            muted
            playsInline
            onEnded={(e) => {
              const video = e.target as HTMLVideoElement
              video.style.objectFit = "cover"
            }}
          ></video>
        </div>
      </div>
    </section>
  )
}

export { Hero }
