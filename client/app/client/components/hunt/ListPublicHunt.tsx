import { Link } from "@remix-run/react"
import { useCustomQuery } from "~/client/hook/useCustomMutation"
import routes from "~/client/routes"
import { getHunts } from "~/client/services/hunt"
import CardWrapper from "../CardWrapper"
import { Button } from "../ui/button"
import Spinner from "../utils/Spinner"

export default function ListPublicHunt() {
  const { isLoading, data } = useCustomQuery(["hunts"], () => getHunts())

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
    <section className="mx-8 mt-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Liste des chasses publiques
        </h1>
        <Link
          to={routes.hunts.create}
          className="rounded-full bg-brown px-6 py-1 font-semibold text-white hover:bg-yellow-700"
        >
          Créer une chasse
        </Link>
      </div>

      {data.data.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data
            .filter((hunt) => !hunt.privateHunt)
            .filter((hunt) => hunt.draft === false)
            .map((hunt) => (
              <Link
                key={hunt.id}
                to={routes.hunts.one(hunt.name.trim().toLowerCase().replace(/\s+/g, "-"))}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-xl font-semibold group-hover:text-brown">{hunt.name}</h2>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(hunt.startDate).toLocaleDateString("fr-FR")} →{" "}
                  {new Date(hunt.endDate).toLocaleDateString("fr-FR")}
                </p>
              </Link>
            ))}
        </div>
      ) : (
        <div className="mx-auto flex h-full w-fit items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold text-gray-500">
            <div className="flex flex-col items-center gap-5">
              <p>Vous n&apos;avez pas encore créé de chasse.</p>
              <Link
                to={routes.hunts.create}
                className="ml-2 text-brown underline hover:text-yellow-700"
              >
                Créer une chasse
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
