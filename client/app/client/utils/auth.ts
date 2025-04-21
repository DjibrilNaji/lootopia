import type { LoaderFunctionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { jwtDecode } from "jwt-decode"
import type { UserPayload } from "~/types/user"

export async function requireUser({ request }: LoaderFunctionArgs): Promise<UserPayload> {
  const cookieHeader = request.headers.get("Cookie") || ""
  const cookies: Record<string, string> = Object.fromEntries(
    cookieHeader.split(";").map((cookie) => {
      const [name, value] = cookie.trim().split("=")
      return [name, value]
    })
  )

  const token = cookies["accessToken"]
  if (!token) throw redirect("/")

  try {
    const user = jwtDecode<UserPayload>(token)
    return user
  } catch {
    throw redirect("/")
  }
}
