import { Link } from "@remix-run/react"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import routes from "~/client/routes"

const sections = [
  {
    title: "Lootopia",
    links: [
      { name: "À propos", href: "#" },
      { name: "Fonctionnalités", href: "#" },
      { name: "Tarifs", href: "#" },
      { name: "Carrières", href: "#" }
    ]
  },
  {
    title: "Aide",
    links: [
      { name: "Support client", href: "#" },
      { name: "Guide d'utilisation", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Contact", href: routes.contact }
    ]
  },
  {
    title: "Ressources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Tutoriels", href: "#" },
      { name: "Communauté", href: "#" },
      { name: "Événements", href: "#" }
    ]
  }
]

export function Footer() {
  return (
    <footer className="mt-0 w-full">
      <div className="w-full px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <img src={routes.img.trasureNoBg} alt="logo" className="h-11" />
                  <p className="font-uniSansItalic text-4xl font-bold">Lootopia</p>
                </span>
                <p className="mt-6 text-sm">
                  La chasse au trésor réinventée grâce à la réalité augmentée. Explorez, découvrez
                  et vivez l&apos;aventure.
                </p>
              </div>
              <ul className="flex items-center space-x-6">
                <li className="font-medium hover:text-gray-300">
                  <Link to="#">
                    <Instagram className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-gray-300">
                  <Link to="#">
                    <Facebook className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-gray-300">
                  <Link to="#">
                    <Twitter className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-gray-300">
                  <Link to="#">
                    <Linkedin className="size-6" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold text-gray-300">{section.title}</h3>
                  <ul className="space-y-4 text-sm">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="font-medium hover:text-gray-300">
                        <Link to={link.href}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium lg:flex-row lg:items-center lg:text-left">
            <p>© 2025 Lootopia. Tous droits réservés.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-gray-300">
                <Link to="#"> Conditions d&apos;utilisation</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="#"> Politique de confidentialité</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
