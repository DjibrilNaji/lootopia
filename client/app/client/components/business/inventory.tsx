/* eslint-disable jsx-a11y/label-has-associated-control */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/client/components/ui/card"
import { Button } from "~/client/components/ui/button"
import { Badge } from "~/client/components/ui/badge"
import { Crown, Zap, Gem, Star, Sword, Shield, Package, Loader2, CheckCircle} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/client/components/ui/dialog"
import { Input } from "~/client/components/ui/input"

interface InventoryItem {
  id: string
  name: string
  description: string
  price: number
  rarity: "common" | "rare" | "epic" | "legendary"
  category: "weapon" | "armor" | "accessory" | "consumable"
  seller: string
  image: string
  stats?: string[]
  quantity: number
  acquiredDate: string
}

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

interface SellModalState {
  isOpen: boolean
  step: "summary" | "loading" | "success"
  selectedItem: InventoryItem | null
  price: string
}

interface InventoryProps {
  inventory: InventoryItem[]
  onSellItem: (item: InventoryItem, price: number) => Promise<void> // assuming async sell handler
}

export function Inventory({ inventory, onSellItem }: InventoryProps) {
  const [sellModal, setSellModal] = useState<SellModalState>({
    isOpen: false,
    step: "summary",
    selectedItem: null,
    price: "",
  })

  const openSellModal = (item: InventoryItem) => {
    setSellModal({
      isOpen: true,
      step: "summary",
      selectedItem: item,
      price: item.price.toString(),
    })
  }

  const closeSellModal = () => {
    setSellModal({
      isOpen: false,
      step: "summary",
      selectedItem: null,
      price: "",
    })
  }

  const handleConfirmSell = async () => {
    if (!sellModal.selectedItem) return
    const priceNumber = Number.parseInt(sellModal.price)
    if (isNaN(priceNumber) || priceNumber <= 0) return

    setSellModal((prev) => ({ ...prev, step: "loading" }))
    try {
      await onSellItem(sellModal.selectedItem, priceNumber)
      setSellModal((prev) => ({ ...prev, step: "success" }))
    } catch (e) {
      // Handle error if needed
      setSellModal((prev) => ({ ...prev, step: "summary" }))
      alert("Erreur lors de la vente, veuillez réessayer.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Inventaire header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-8 w-8 text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900">Mon Inventaire</h2>
          </div>
          <p className="text-gray-600">Gérez vos artefacts et mettez-les en vente</p>
        </div>
        <div className="bg-green-100 px-4 py-2 rounded-lg">
          <span className="text-green-800 font-semibold">
            {inventory.reduce((acc, item) => acc + item.quantity, 0)} objets possédés
          </span>
        </div>
      </div>

      {/* Liste des items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {inventory.map((item) => {
          const RarityIcon = rarityIcons[item.rarity]
          const CategoryIcon = categoryIcons[item.category]

          return (
            <Card key={item.id} className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader className="pb-3">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className={`${rarityColors[item.rarity]} border`}>
                      <RarityIcon className="h-3 w-3 mr-1" />
                      {item.rarity}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {item.category}
                    </Badge>
                  </div>
                  {item.quantity > 1 && (
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-blue-500 text-white">x{item.quantity}</Badge>
                    </div>
                  )}
                </div>

                <CardTitle className="text-lg font-bold line-clamp-1">{item.name}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {item.stats && (
                  <div className="space-y-1">
                    {item.stats.map((stat, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {stat}
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Acquis le:</span>
                    <span className="font-medium">{new Date(item.acquiredDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Crown className="h-4 w-4 text-yellow-600" />
                      <span className="font-bold text-lg text-yellow-600">~{item.price.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-gray-500">Valeur estimée</span>
                  </div>

                  <Button
                    onClick={() => openSellModal(item)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Vendre
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {inventory.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Inventaire vide</h3>
          <p className="text-gray-500">Achetez des artefacts sur la marketplace pour remplir votre inventaire</p>
        </div>
      )}

      {/* Modal de vente */}
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
                        onChange={(e) => setSellModal((prev) => ({ ...prev, price: e.target.value }))}
                        placeholder="Prix en Couronnes"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Prix suggéré: {sellModal.selectedItem.price.toLocaleString()} Couronnes
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Vous recevrez:</span>
                        <span className="font-bold text-yellow-600 text-xl">
                          {(Number.parseInt(sellModal.price) || sellModal.selectedItem.price).toLocaleString()} Couronnes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={closeSellModal} className="flex-1 bg-transparent">
                      Annuler
                    </Button>
                    <Button
                      onClick={handleConfirmSell}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
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
                    Vous avez reçu {(Number.parseInt(sellModal.price) || sellModal.selectedItem.price).toLocaleString()} Couronnes
                  </p>
                  <Button onClick={closeSellModal} className="mt-6 bg-green-600 hover:bg-green-700 text-white">
                    Fermer
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
