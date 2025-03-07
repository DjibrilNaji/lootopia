import { Link } from "@remix-run/react"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "~/client/components/ui/badge"

interface HeroProps {
  badge?: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
  }
}

export function Hero({
  badge = "✨ Find Your Treasure",
  buttons = {
    primary: {
      text: "Rejoignez l'aventure",
      url: "#"
    }
  }
}: HeroProps) {
  return (
    <section className="flex items-center justify-center px-6 py-32 md:py-12 lg:px-2">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge className="my-4" variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="font-uniSansItalic text-4xl font-bold leading-tight md:text-6xl lg:text-7xl xl:text-8xl">
              La Chasse au <br />
              Trésor <span className="italic text-yellow-400">Réinventée</span>
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl xl:text-3xl">
              Vivez l&apos;aventure avec Lootopia : votre plateforme de chasses au trésor en Réalité
              Augmentée.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row md:flex-row md:justify-center lg:justify-start">
              {buttons.primary && (
                <button className="mb-2 me-2 w-full rounded-lg border border-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900 sm:w-auto">
                  <Link to={buttons.primary.url}>{buttons.primary.text}</Link>
                </button>
              )}
            </div>
          </div>
          <div className="md:flex md:justify-center">
            <video
              className="max-h-80 w-full -rotate-90 overflow-hidden rounded-md object-cover sm:max-h-96 md:max-h-[400px] md:w-2/3 lg:max-h-[500px]"
              src="/img/Hero-3.mp4"
              autoPlay
              muted
              playsInline
              onEnded={(e) => {
                const video = e.target as HTMLVideoElement
                video.style.objectFit = "cover"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
