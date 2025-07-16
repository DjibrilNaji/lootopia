import { Link } from "@remix-run/react"
import routes from "~/client/routes"
import { HuntDto } from "~/types/api"
import { HuntsTabsEnum } from "~/types/hunts"

interface ListHuntItemProps {
  huntTab: HuntsTabsEnum
  hunts: HuntDto[]
}

export default function ListHuntItem({ huntTab, hunts }: ListHuntItemProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          {huntTab === HuntsTabsEnum.HUNT ? "Mes chasses" : "Mes brouillons"}
        </h1>
        <Link
          to={routes.hunts.create}
          className="rounded-full bg-brown px-6 py-1 font-semibold text-white hover:bg-yellow-700"
        >
          Créer une chasse
        </Link>
      </div>

      {hunts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hunts.map((hunt) => (
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
            {huntTab === HuntsTabsEnum.HUNT ? (
              <div className="flex flex-col items-center gap-5">
                <p>Vous n&apos;avez pas encore créé de chasse.</p>
                <Link
                  to={routes.hunts.create}
                  className="ml-2 text-brown underline hover:text-yellow-700"
                >
                  Créer une chasse
                </Link>
              </div>
            ) : (
              "Vous n'avez pas encore de brouillon."
            )}
          </div>
        </div>
      )}
    </>
  )
}
