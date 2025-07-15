/* eslint-disable jsx-a11y/label-has-associated-control */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/client/components/ui/card"
import { Button } from "~/client/components/ui/button"
import { Badge } from "~/client/components/ui/badge"
import { Input } from "~/client/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/client/components/ui/dialog"
import {
  Crown,
  Zap,
  Gem,
  Star,
  Sword,
  Shield,
  Search,
  ShoppingCart,
  User,
  CheckCircle,
  ArrowRight,
  Loader2,
  Plus,
} from "lucide-react"

interface Artifact {
  id: string
  name: string
  description: string
  price: number
  rarity: "common" | "rare" | "epic" | "legendary"
  category: "weapon" | "armor" | "accessory" | "consumable"
  seller: string
  image: string
  stats?: string[]
}

interface InventoryItem extends Artifact {
  quantity: number
  acquiredDate: string
}

const artifacts: Artifact[] = [
  {
    id: "1",
    name: "Épée de Flammes Éternelles",
    description: "Une épée légendaire forgée dans les flammes du dragon ancien.",
    price: 2500,
    rarity: "legendary",
    category: "weapon",
    seller: "DragonSlayer99",
    image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: ["+150 Attaque", "+50 Dégâts de feu", "Effet: Flammes éternelles"],
  },
  {
    id: "2",
    name: "Bouclier de Cristal",
    description: "Un bouclier rare taillé dans un cristal magique.",
    price: 800,
    rarity: "epic",
    category: "armor",
    seller: "CrystalMage",
    image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: ["+200 Défense", "+30 Résistance magique"],
  },
  {
    id: "3",
    name: "Amulette de Chance",
    description: "Une amulette mystique qui augmente la chance.",
    price: 1200,
    rarity: "rare",
    category: "accessory",
    seller: "LuckyCharm",
    image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: ["+25% Chance de loot", "+10 Charisme"],
  },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-800 border-gray-300",
  rare: "bg-blue-100 text-blue-800 border-blue-300",
  epic: "bg-purple-100 text-purple-800 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-300",
}

const rarityIcons = {
  common: Star,
  rare: Zap,
  epic: Gem,
  legendary: Crown,
}

const categoryIcons = {
  weapon: Sword,
  armor: Shield,
  accessory: Gem,
  consumable: Zap,
}

interface MarketplaceProps {
  currentBalance: number
  onBalanceUpdate: (newBalance: number) => void
  inventory: InventoryItem[]
  onInventoryUpdate: (inventory: InventoryItem[]) => void
}

export function Marketplace({ currentBalance, onBalanceUpdate, inventory, onInventoryUpdate }: MarketplaceProps) {
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRarity, setSelectedRarity] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // États pour l'achat (2 étapes)
  const [buyModal, setBuyModal] = useState({
    isOpen: false,
    step: "summary" as "summary" | "loading" | "success",
    selectedArtifact: null as Artifact | null,
  })

  // États pour la vente (2 étapes)
  const [sellModal, setSellModal] = useState({
    isOpen: false,
    step: "summary" as "summary" | "loading" | "success",
    selectedItem: null as InventoryItem | null,
    price: "",
  })

  // ===== FONCTIONS D'ACHAT =====
  const openBuyModal = (artifact: Artifact) => {
    console.log("🟡 Marketplace: Ouverture modal achat pour", artifact.name)
    setBuyModal({
      isOpen: true,
      step: "summary",
      selectedArtifact: artifact,
    })
  }

  const closeBuyModal = () => {
    console.log("🟡 Marketplace: Fermeture modal achat")
    setBuyModal({
      isOpen: false,
      step: "summary",
      selectedArtifact: null,
    })
  }

  const handleConfirmBuy = async () => {
    if (!buyModal.selectedArtifact) return

    const artifact = buyModal.selectedArtifact

    if (currentBalance < artifact.price) {
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            type: "error",
            title: "Couronnes insuffisantes",
            description: `Il vous faut ${artifact.price - currentBalance} Couronnes supplémentaires`,
          },
        }),
      )
      return
    }

    // Étape 1: Loading
    setBuyModal((prev) => ({ ...prev, step: "loading" }))

    // Simulation du traitement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Étape 2: Traitement
    const newBalance = currentBalance - artifact.price
    onBalanceUpdate(newBalance)

    // Ajouter à l'inventaire
    const newItem: InventoryItem = {
      ...artifact,
      id: `inv_${Date.now()}`,
      seller: "Vous",
      quantity: 1,
      acquiredDate: new Date().toISOString().split("T")[0],
    }
    onInventoryUpdate([...inventory, newItem])

    // Toast de succès
    window.dispatchEvent(
      new CustomEvent("showToast", {
        detail: {
          type: "success",
          title: "Artefact acheté !",
          description: `Vous avez acheté ${artifact.name} pour ${artifact.price} Couronnes`,
          artifactData: { ...artifact, transaction: "achat" },
        },
      }),
    )

    // Étape 3: Succès puis fermeture
    setBuyModal((prev) => ({ ...prev, step: "success" }))
    setTimeout(() => {
      closeBuyModal()
    }, 1500)
  }

  // ===== FONCTIONS DE VENTE =====
  const openSellModal = (item: InventoryItem) => {
    console.log("🟢 Marketplace: Ouverture modal vente pour", item.name)
    setSellModal({
      isOpen: true,
      step: "summary",
      selectedItem: item,
      price: item.price.toString(),
    })
  }

  const closeSellModal = () => {
    console.log("🟢 Marketplace: Fermeture modal vente")
    setSellModal({
      isOpen: false,
      step: "summary",
      selectedItem: null,
      price: "",
    })
  }

  const handleConfirmSell = async () => {
    if (!sellModal.selectedItem) return

    // Étape 1: Loading
    setSellModal((prev) => ({ ...prev, step: "loading" }))

    // Simulation du traitement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Étape 2: Traitement
    const salePrice = Number.parseInt(sellModal.price) || sellModal.selectedItem.price
    const newBalance = currentBalance + salePrice
    onBalanceUpdate(newBalance)

    // Retirer de l'inventaire
    const updatedInventory = inventory
      .map((item) => {
        if (item.id === sellModal.selectedItem!.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return null
        }
        return item
      })
      .filter(Boolean) as InventoryItem[]

    onInventoryUpdate(updatedInventory)

    // Toast de succès
    window.dispatchEvent(
      new CustomEvent("showToast", {
        detail: {
          type: "success",
          title: "Artefact vendu !",
          description: `Vous avez vendu ${sellModal.selectedItem.name} pour ${salePrice} Couronnes`,
          artifactData: { ...sellModal.selectedItem, salePrice, transaction: "vente" },
        },
      }),
    )

    // Étape 3: Succès puis fermeture
    setSellModal((prev) => ({ ...prev, step: "success" }))
    setTimeout(() => {
      closeSellModal()
    }, 1500)
  }

  // Filtrage des artefacts
  const filteredArtifacts = artifacts.filter((artifact) => {
    const matchesSearch =
      artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artifact.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === "all" || artifact.rarity === selectedRarity
    const matchesCategory = selectedCategory === "all" || artifact.category === selectedCategory
    return matchesSearch && matchesRarity && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header avec bouton de vente */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-8 w-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-gray-900">Marketplace d&apos;Artefacts</h2>
          </div>
          <p className="text-gray-600">Achetez et vendez des objets légendaires</p>
        </div>

        <Button
          onClick={() => {
            if (inventory.length > 0) {
              openSellModal(inventory[0])
            } else {
              window.dispatchEvent(
                new CustomEvent("showToast", {
                  detail: {
                    type: "error",
                    title: "Inventaire vide",
                    description: "Vous n'avez aucun objet à vendre",
                  },
                }),
              )
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Vendre un objet
        </Button>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un artefact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Toutes les raretés</option>
                <option value="common">Commun</option>
                <option value="rare">Rare</option>
                <option value="epic">Épique</option>
                <option value="legendary">Légendaire</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Toutes les catégories</option>
                <option value="weapon">Armes</option>
                <option value="armor">Armures</option>
                <option value="accessory">Accessoires</option>
                <option value="consumable">Consommables</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille d'artefacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtifacts.map((artifact) => {
          const RarityIcon = rarityIcons[artifact.rarity]
          const CategoryIcon = categoryIcons[artifact.category]
          const canAfford = currentBalance >= artifact.price

          return (
            <Card key={artifact.id} className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader className="pb-3">
                <div className="relative">
                  <img
                    src={artifact.image || "/placeholder.svg"}
                    alt={artifact.name}
                    className="w-full h-48 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className={`${rarityColors[artifact.rarity]} border`}>
                      <RarityIcon className="h-3 w-3 mr-1" />
                      {artifact.rarity}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {artifact.category}
                    </Badge>
                  </div>
                </div>

                <CardTitle className="text-lg font-bold line-clamp-1">{artifact.name}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{artifact.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {artifact.stats && (
                  <div className="space-y-1">
                    {artifact.stats.map((stat, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {stat}
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Crown className="h-4 w-4 text-yellow-600" />
                      <span className="font-bold text-lg text-yellow-600">{artifact.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      {artifact.seller}
                    </div>
                  </div>

                  <Button
                    onClick={() => openBuyModal(artifact)}
                    disabled={!canAfford}
                    className={`w-full ${
                      canAfford ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {canAfford ? "Acheter" : "Couronnes insuffisantes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal d'achat (2 étapes) */}
      <Dialog open={buyModal.isOpen} onOpenChange={closeBuyModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-yellow-600" />
              {buyModal.step === "summary" && "Confirmer votre achat"}
              {buyModal.step === "loading" && "Traitement en cours..."}
              {buyModal.step === "success" && "Achat réussi !"}
            </DialogTitle>
          </DialogHeader>

          {buyModal.selectedArtifact && (
            <div className="space-y-6">
              {buyModal.step === "summary" && (
                <>
                  <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={buyModal.selectedArtifact.image || "/placeholder.svg"}
                          alt={buyModal.selectedArtifact.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{buyModal.selectedArtifact.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{buyModal.selectedArtifact.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={`${rarityColors[buyModal.selectedArtifact.rarity]} border`}>
                              {buyModal.selectedArtifact.rarity}
                            </Badge>
                            <Badge variant="secondary">{buyModal.selectedArtifact.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Prix:</span>
                      <span className="font-bold text-yellow-600 text-xl">
                        {buyModal.selectedArtifact.price.toLocaleString()} Couronnes
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium">Solde actuel:</span>
                      <span className="font-bold text-blue-600">{currentBalance.toLocaleString()} Couronnes</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-medium">Solde après achat:</span>
                      <span className="font-bold text-green-600">
                        {(currentBalance - buyModal.selectedArtifact.price).toLocaleString()} Couronnes
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={closeBuyModal} className="flex-1 bg-transparent">
                      Annuler
                    </Button>
                    <Button onClick={handleConfirmBuy} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Confirmer l&apos;achat
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {buyModal.step === "loading" && (
                <div className="text-center py-12">
                  <Loader2 className="h-16 w-16 text-yellow-500 mx-auto mb-6 animate-spin" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Traitement de votre achat...</h3>
                  <p className="text-gray-600">Veuillez patienter pendant que nous finalisons votre transaction</p>
                </div>
              )}

              {buyModal.step === "success" && (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Achat confirmé !</h3>
                  <p className="text-gray-600">{buyModal.selectedArtifact.name} a été ajouté à votre inventaire</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de vente (2 étapes) */}
<Dialog open={sellModal.isOpen} onOpenChange={closeSellModal}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Crown className="h-6 w-6 text-green-600" />
        {sellModal.step === "summary" && "Vendre un artefact"}
        {sellModal.step === "loading" && "Traitement en cours..."}
        {sellModal.step === "success" && "Vente réussie !"}
      </DialogTitle>
    </DialogHeader>

    {sellModal.selectedItem && (
      <div className="space-y-6">
        {sellModal.step === "summary" && (
          <>
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={sellModal.selectedItem.image || "/placeholder.svg"}
                    alt={sellModal.selectedItem.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{sellModal.selectedItem.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{sellModal.selectedItem.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={`${rarityColors[sellModal.selectedItem.rarity]} border`}>
                        {sellModal.selectedItem.rarity}
                      </Badge>
                      <Badge variant="secondary">{sellModal.selectedItem.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix de vente (Couronnes)</label>
                <Input
                  type="number"
                  value={sellModal.price}
                  onChange={(e) =>
                    setSellModal((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="Prix en Couronnes"
                  className="w-full"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Prix suggéré: {sellModal.selectedItem.price.toLocaleString()} Couronnes
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Vous recevrez:</span>
                  <span className="font-bold text-yellow-600 text-xl">
                    {(() => {
                      const parsed = Number(sellModal.price);
                      return !isNaN(parsed) ? parsed.toLocaleString() : sellModal.selectedItem.price.toLocaleString();
                    })()}{" "}
                    Couronnes
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={closeSellModal} className="flex-1 bg-transparent">
                Annuler
              </Button>
              <Button onClick={handleConfirmSell} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-5 w-5 mr-2" />
                Confirmer la vente
              </Button>
            </div>
          </>
        )}

        {sellModal.step === "loading" && (
          <div className="text-center py-12">
            <Loader2 className="h-16 w-16 text-green-500 mx-auto mb-6 animate-spin" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Traitement de votre vente...</h3>
            <p className="text-gray-600">Veuillez patienter pendant que nous finalisons votre transaction</p>
          </div>
        )}

        {sellModal.step === "success" && (
          <div className="text-center py-12">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Vente confirmée !</h3>
            <p className="text-gray-600">
              Vous avez reçu{" "}
              {(() => {
                const parsed = Number(sellModal.price);
                return !isNaN(parsed) ? parsed.toLocaleString() : sellModal.selectedItem.price.toLocaleString();
              })()}{" "}
              Couronnes
            </p>
          </div>
        )}
      </div>
    )}
  </DialogContent>
</Dialog>
    </div>
  )
}
