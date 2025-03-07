import { Link } from "@remix-run/react"
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/client/components/ui/accordion"
import { Button } from "~/client/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "~/client/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/client/components/ui/sheet"
import routes from "~/client/routes"

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface NavbarProps {
  logo?: {
    src: string
    alt: string
    title: string
  }
  menu?: MenuItem[]
  mobileExtraLinks?: {
    name: string
    url: string
  }[]
  auth?: {
    login: {
      text: string
      url: string
    }
    signup: {
      text: string
      url: string
    }
  }
}

export function Navbar({
  logo = {
    src: routes.img.trasureNoBg,
    alt: "LOOTOPIA",
    title: "LOOTOPIA"
  },
  menu = [
    { title: "Accueil", url: "#" },
    {
      title: "L'Expérience",
      url: "#",
      items: [
        {
          title: "Légendes & Quêtes",
          description: "Explore des aventures épiques et des trésors cachés",
          icon: <Book className="size-5 shrink-0" />,
          url: "#"
        },
        {
          title: "L'Univers de Lootopia",
          description: "Un monde rempli de mystères et de défis à relever",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#"
        },
        {
          title: "Deviens un Aventurier",
          description: "Inscris-toi et commence ta quête dès aujourd'hui",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#"
        },
        {
          title: "Support & Aide",
          description: "Besoin d’un indice ? Notre équipe est là pour t’aider",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#"
        }
      ]
    },
    {
      title: "Ressources",
      url: "#",
      items: [
        {
          title: "Guide du Chasseur",
          description: "Toutes les règles et astuces pour réussir tes quêtes",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#"
        },
        {
          title: "Contact",
          description: "Une question ? Une idée ? Échangeons ensemble !",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#"
        },
        {
          title: "Statut des Quêtes",
          description: "Suis l'évolution des défis et événements en cours",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#"
        },
        {
          title: "Conditions d'Utilisation",
          description: "Les règles du jeu et notre engagement envers la communauté",
          icon: <Book className="size-5 shrink-0" />,
          url: "#"
        }
      ]
    }
  ],
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" }
  ],
  auth = {
    login: { text: "Se connecter", url: routes.auth.login },
    signup: { text: "S'inscrire", url: routes.auth.register }
  }
}: NavbarProps) {
  return (
    <section className="flex items-center justify-center border-b py-4">
      <div className="container bg-white p-5">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to={routes.home} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="font-uniSansItalic text-lg font-semibold">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
              asChild
            >
              <Link to={auth.login.url}>{auth.login.text}</Link>
            </Button>
            <Button
              variant="outline"
              className="asChild mb-2 me-2 w-full rounded-lg border border-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900 sm:w-auto"
            >
              <Link to={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={routes.home} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="font-uniSansItalic text-lg font-semibold">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={routes.home} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="font-uniSansItalic text-lg font-semibold">{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          to={link.url}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="mb-2 me-2 w-full rounded-lg border px-5 py-2.5 text-center text-sm font-medium text-black hover:text-gray-400 focus:outline-none focus:ring-4 sm:w-auto"
                      asChild
                    >
                      <Link to={auth.login.url}>{auth.login.text}</Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="mb-2 me-2 w-full rounded-lg border border-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900 sm:w-auto"
                      asChild
                    >
                      <Link to={auth.signup.url}>{auth.signup.text}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    to={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">{subItem.title}</div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <Link
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      to={item.url}
    >
      {item.title}
    </Link>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              to={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <Link key={item.title} to={item.url} className="font-semibold">
      {item.title}
    </Link>
  )
}
