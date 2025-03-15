import type { MetaFunction } from "@remix-run/node"

import { Faq } from "~/client/components/business/FAQ"
import { Feature } from "~/client/components/business/Feature"
import { Hero } from "~/client/components/business/Hero"
import { Testimonial } from "~/client/components/business/Testimonial"
import { Work } from "~/client/components/business/WorkPage"
import Wrapper from "~/client/components/Wrapper"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia" }, { name: "Lootopia", content: "Welcome to Lootopia!" }]
}

export default function Index() {
  return (
    <Wrapper isLoading={false} error={null}>
      <Hero />
      <Feature />
      <Work />
      <Faq />
      <Testimonial />
    </Wrapper>
  )
}
