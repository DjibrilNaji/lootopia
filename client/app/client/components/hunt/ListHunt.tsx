import { Link } from "@remix-run/react"
import { useState } from "react"
import { useCustomQuery } from "~/client/hook/useCustomMutation"
import routes from "~/client/routes"
import { getHunts } from "~/client/services/hunt"
import { HuntsTabsEnum } from "~/types/hunts"
import CardWrapper from "../CardWrapper"
import { Button } from "../ui/button"
import Spinner from "../utils/Spinner"
import ListHuntItem from "./ListHuntItem"

export default function ListHunt() {
  const { isLoading, data } = useCustomQuery(["hunts"], getHunts)
  const [huntsTab, setHuntsTab] = useState<HuntsTabsEnum>(HuntsTabsEnum.HUNT)

  const handleTabChange = (tab: HuntsTabsEnum) => setHuntsTab(tab)

  const getTabButtonClass = (tab: HuntsTabsEnum) =>
    huntsTab === tab
      ? "bg-gradient-to-r from-brown to-yellow-700 text-white shadow transition hover:brightness-110"
      : "border border-gray-300 bg-white text--700 transition hover:border-gray-400 hover:bg-gray-50"

  if (isLoading) return <Spinner />

  if (!data) {
    return (
      <div className="flex h-full">
        <CardWrapper className="flex flex-col items-center justify-center gap-6 border border-red-300 bg-red-50 py-10 text-center">
          <img src={routes.img.trasureNoBg} alt="Erreur" className="h-40 object-contain" />
          <p className="text-lg font-bold text-red-600">
            La récupération des chasses a échoué. Veuillez réessayer.
          </p>
          <Link to={routes.home}>
            <Button className="bg-red-500 text-lg hover:bg-red-600">Retour à l&apos;accueil</Button>
          </Link>
        </CardWrapper>
      </div>
    )
  }

  return (
    <section className="mx-8 space-y-8">
      <div className="mt-10 flex justify-center gap-4">
        <Button
          onClick={() => handleTabChange(HuntsTabsEnum.HUNT)}
          className={`rounded-full px-6 py-2 font-semibold ${getTabButtonClass(HuntsTabsEnum.HUNT)}`}
        >
          📌 Mes chasses
        </Button>
        <Button
          onClick={() => handleTabChange(HuntsTabsEnum.DRAFT)}
          className={`rounded-full px-6 py-2 font-semibold ${getTabButtonClass(HuntsTabsEnum.DRAFT)}`}
        >
          📝 Mes brouillons
        </Button>
      </div>

      <ListHuntItem
        huntTab={huntsTab}
        hunts={data.data.filter((hunt) =>
          huntsTab === HuntsTabsEnum.HUNT ? !hunt.draft : hunt.draft
        )}
      />
    </section>
  )
}
