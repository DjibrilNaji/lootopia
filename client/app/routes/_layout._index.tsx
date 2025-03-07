import type { MetaFunction } from "@remix-run/node"

import { Faq } from "~/client/components/buisness/FAQ"
import { Feature } from "~/client/components/buisness/Feature"
import { Hero } from "~/client/components/buisness/Hero"
import { Testimonial } from "~/client/components/buisness/Testimonial"
import { Work } from "~/client/components/buisness/WorkPage"
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
