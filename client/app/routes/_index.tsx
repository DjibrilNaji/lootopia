/* eslint-disable import/no-unresolved */
import type { MetaFunction } from "@remix-run/node";
import { Faq } from "~/components/buisness/FAQ";
import { Feature } from "~/components/buisness/Feature";
import { Footer } from "~/components/buisness/Footer";
import { Navbar } from "~/components/buisness/Header";
import { Hero } from "~/components/buisness/Hero";
import { Testimonial } from "~/components/buisness/Testimonial";
import { Work } from "~/components/buisness/WorkPage";
import Wrapper from "~/components/Wrapper";

export const meta: MetaFunction = () => {
  return [
    { title: "Lootopia" },
    { name: "description", content: "Welcome to Lootopia!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Wrapper isLoading={false} error={null}>
    <Navbar></Navbar>
     <Hero heading={"La Chasse au Trésor Réinventée"} description={"Vivez l'aventure avec Lootopia : votre plateforme de chasses au trésor en Réalité Augmentée."}>
        </Hero>
        <Feature></Feature>
        <Work></Work>
        <Faq heading={"FAQ - Questions Fréquentes"} description={"Besoin de plus d’aide ?"} supportHeading={"Besoin de plus d’aide ?"} supportDescription={"Notre équipe de support dédiée est là pour répondre à toutes vos questions ou préoccupations."} supportButtonText={"Contactez-nous pour une assistance personnalisée."} supportButtonUrl={"#"}></Faq>
        <Testimonial></Testimonial>
        <Footer></Footer>
      </Wrapper> 
    </div>
  );
}
