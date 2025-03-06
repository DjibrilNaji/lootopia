import type { MetaFunction } from "@remix-run/node"

import { Faq } from "~/components/buisness/FAQ"
import { Feature } from "~/components/buisness/Feature"
import { Footer } from "~/components/buisness/Footer"
import { Navbar } from "~/components/buisness/Header"
import { Hero } from "~/components/buisness/Hero"
import { Testimonial } from "~/components/buisness/Testimonial"
import { Work } from "~/components/buisness/WorkPage"
import Wrapper from "~/components/Wrapper"

export const meta: MetaFunction = () => {
  return [{ title: "Lootopia" }, { name: "Lootopia", content: "Welcome to Lootopia!" }]
}

export default function Index() {
  return (
    <div>
      <Wrapper isLoading={false} error={null}>
        <Navbar />
        <Hero />
        <Feature />
        <Work />
        <Faq />
        <Testimonial />
        <Footer />
      </Wrapper>
    </div>
  )
}
