import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Sparkles } from "lucide-react"
import { useState } from "react"

export function Work() {
  const [activeTab, setActiveTab] = useState("Discovery")
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-4xl font-bold font-uniSansItalic mb-6">
              Comment ça marche
            </h2>
            <TabsList className="p-1 ">
              <TabsTrigger
                value="Discovery"
                className={`${
                  activeTab === "Discovery" ? "bg-amber-400 rounded-sm text-white" : "text-gray-700"
                } px-6 py-2`}
              >
                Découvrir
              </TabsTrigger>
              <TabsTrigger
                value="Create"
                className={`${
                  activeTab === "Create" ? "bg-amber-400 rounded-sm text-white" : "text-gray-700"
                } px-6 py-2`}
              >
                Créer
              </TabsTrigger>
              <TabsTrigger
                value="Play"
                className={`${
                  activeTab === "Play" ? "bg-amber-400 rounded-sm text-white" : "text-gray-700"
                } px-6 py-2`}
              >
                Jouer
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="Discovery" className="mt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=2070"
                  alt="Découvrir des trésors"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-semibold font-uniSansItalic text-gray-800">
                  Explorez votre environnement
                </h3>
                <p className="text-gray-600">
                  Parcourez la carte pour trouver des chasses au trésor près de chez vous. Chaque
                  aventure vous emmène dans un voyage unique avec des énigmes et des défis à
                  relever.
                </p>
                <ul className="space-y-2">
                  {[
                    "Parcours thématiques",
                    "Différents niveaux de difficulté",
                    "Expériences saisonnières"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-400" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="Create" className="mt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-semibold font-uniSansItalic text-gray-800">
                  Concevez vos propres aventures
                </h3>
                <p className="text-gray-600">
                  Utilisez notre éditeur intuitif pour créer des chasses au trésor personnalisées.
                  Placez des indices, des énigmes et des trésors virtuels n&apos;importe où dans le
                  monde réel.
                </p>
                <ul className="space-y-2">
                  {[
                    "Éditeur drag-and-drop",
                    "Bibliothèque d'objets 3D",
                    "Partage avec la communauté"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-400" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070"
                  alt="Créer des chasses au trésor"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="Play" className="mt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071"
                  alt="Jouer avec des amis"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-semibold font-uniSansItalic text-gray-800">
                  Vivez l&apos;aventure
                </h3>
                <p className="text-gray-600">
                  Formez une équipe avec vos amis ou affrontez d&apos;autres joueurs. Résolvez des
                  énigmes, suivez des indices et découvrez des trésors cachés en réalité augmentée.
                </p>
                <ul className="space-y-2">
                  {["Mode compétitif", "Classements mondiaux", "Récompenses virtuelles"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-400" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
