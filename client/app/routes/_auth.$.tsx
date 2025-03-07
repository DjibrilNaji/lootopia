import { MetaFunction } from "@remix-run/node"

import routes from "~/client/routes"

export const meta: MetaFunction = () => {
  return [{ title: "Not found - 404" }, { name: "description", content: "Page not found" }]
}

export default function NotFound() {
  return (
    <div className="m-auto flex h-full flex-col items-center justify-center gap-10">
      <h1 className="text-brown text-7xl font-bold">404</h1>
      <p className="font-uniSansItalic text-2xl font-semibold">Oops... page non trouvé</p>
      <img src={routes.img.notFound} alt="Remix" className="h-96 object-contain" />
    </div>
  )
}
