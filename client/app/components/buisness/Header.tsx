import { Book, Menu, Sunset, Trees, Zap } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Button } from "../ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "../ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface NavbarProps {
  logo?: {
    url: string
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

const Navbar = ({
  logo = {
    url: "#",
    src: "/img/tresor-removebg-preview.png",
    alt: "",
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
    login: { text: "Se connecter", url: "#" },
    signup: { text: "S'inscrire", url: "#" }
  }
}: NavbarProps) => {
  return (
    <section className="py-4 flex justify-center items-center ">
      <div className="container bg-white p-5">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold font-uniSansItalic">{logo.title}</span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-full text-black hover:text-gray-400   focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  sm:w-auto">
              <a href={auth.login.url}>{auth.login.text}</a>
            </button>
            <button className="w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 sm:w-auto">
              <a href={auth.signup.url}>{auth.signup.text}</a>
            </button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold">{logo.title}</span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <a
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="w-full text-black hover:text-gray-400 border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2   sm:w-auto">
                      <a href={auth.login.url}>{auth.login.text}</a>
                    </button>

                    <button className="w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 sm:w-auto">
                      <a href={auth.signup.url}>{auth.signup.text}</a>
                    </button>
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
                  <a
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    href={subItem.url}
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
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      {item.title}
    </a>
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
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              href={subItem.url}
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
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <a key={item.title} href={item.url} className="font-semibold">
      {item.title}
    </a>
  )
}

export { Navbar }
