import type { MetaFunction } from "@remix-run/node"

import { ContactForm } from "~/client/components/ContactForm"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia - Contact" }, { name: "Lootopia", content: "Contactez-nous" }]
}

export default function ContactPage() {
  return <ContactForm />
}
