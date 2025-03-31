import type { LinksFunction } from "@remix-run/node"
import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import { Toaster } from "sonner"
import { useDehydratedState } from "use-dehydrated-state"

import "./tailwind.css"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

interface Cookies {
  [key: string]: string
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie") || ""

  const cookies: Cookies = cookieHeader.split(";").reduce((acc: Cookies, cookie: string) => {
    const [name, value] = cookie.trim().split("=")
    return { ...acc, [name]: value }
  }, {})

  const accessToken: string | undefined = cookies["accessToken"]
  const isLoggedIn: boolean = !!accessToken

  return data({
    isLoggedIn,
    user: accessToken ? {} : null
  })
}

export default function App() {
  const [queryClient] = React.useState(() => new QueryClient())
  const dehydratedState = useDehydratedState()
  const { isLoggedIn } = useLoaderData<typeof loader>()

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors position="bottom-right" />
        <Outlet context={{ isLoggedIn }} />
      </Hydrate>
    </QueryClientProvider>
  )
}
