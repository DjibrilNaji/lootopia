"use client"

import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/client/components/ui/tabs"
import { Crown, TrendingUp, CreditCard, ShoppingCart, Package } from "lucide-react"
import { CrownPurchase } from "~/client/components/business/crown-purchase"
import { Marketplace } from "~/client/components/business/marketplace"
import { Inventory } from "~/client/components/business/inventory"
import { Navbar } from "~/client/components/business/Header"

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

const initialInventory: InventoryItem[] = [
  {
    id: "inv1",
    name: "Épée Rouillée",
    description: "Une vieille épée encore utilisable.",
    price: 75,
    rarity: "common",
    category: "weapon",
    seller: "Vous",
  image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: ["+15 Attaque", "Durabilité faible"],
    quantity: 1,
    acquiredDate: "2024-01-15",
  },
  {
    id: "inv2",
    name: "Potion de Soin Mineure",
    description: "Une potion basique de soin.",
    price: 25,
    rarity: "common",
    category: "consumable",
    seller: "Vous",
  image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: ["Restaure 25% HP"],
    quantity: 3,
    acquiredDate: "2024-01-10",
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    currentCrowns: 1500,
    initialInventory,
  })
}

export default function Shop() {
  const { currentCrowns, initialInventory } = useLoaderData<typeof loader>()

  // ===== ÉTATS GLOBAUX PARTAGÉS =====
  const [currentBalance, setCurrentBalance] = useState(currentCrowns)
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)

  // ===== FONCTIONS PARTAGÉES =====
  const handleBalanceUpdate = (newBalance: number) => {
    console.log("💰 Shop: Mise à jour du solde", currentBalance, "→", newBalance)
    setCurrentBalance(newBalance)
    window.dispatchEvent(new CustomEvent("crownBalanceUpdate", { detail: { newBalance } }))
  }

  const handleInventoryUpdate = (newInventory: InventoryItem[]) => {
    console.log("📦 Shop: Mise à jour de l'inventaire", newInventory.length, "objets")
    setInventory(newInventory)
  }

  const handleSellFromInventory = async (item: InventoryItem, price: number) => {
    console.log("💸 Vente d'objet :", item.name, "au prix de", price)
  
    // 1. Créditer le solde
    const newBalance = currentBalance + price
    handleBalanceUpdate(newBalance)
  
    // 2. Retirer l'objet de l'inventaire
    const updatedInventory = inventory.filter((i) => i.id !== item.id)
    handleInventoryUpdate(updatedInventory)
  
    // 3. (Facultatif) Message de confirmation
    console.log(`✅ Objet "${item.name}" vendu pour ${price} couronnes.`)
  }
  

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="h-12 w-12 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">Lootopia Shop</h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">Achetez des Couronnes et découvrez des artefacts légendaires</p>

          {/* Solde actuel */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-amber-100 px-6 py-4 rounded-full shadow-lg border-2 border-yellow-200">
            <Crown className="h-6 w-6 text-yellow-600" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-yellow-800 text-2xl">{currentBalance.toLocaleString()}</span>
              <span className="text-sm text-yellow-600 font-medium -mt-1">Couronnes disponibles</span>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* Tabs avec 3 composants séparés */}
        <Tabs defaultValue="crowns" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-lg rounded-lg p-1">
            <TabsTrigger
              value="crowns"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-white font-semibold py-3"
            >
              <CreditCard className="h-5 w-5" />
              Acheter des Couronnes
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-semibold py-3"
            >
              <ShoppingCart className="h-5 w-5" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white font-semibold py-3"
            >
              <Package className="h-5 w-5" />
              Mon Inventaire ({inventory.reduce((acc, item) => acc + item.quantity, 0)})
            </TabsTrigger>
          </TabsList>

          {/* ===== COMPOSANT 1: ACHAT DE COURONNES ===== */}
          <TabsContent value="crowns">
            <CrownPurchase currentBalance={currentBalance} onBalanceUpdate={handleBalanceUpdate} />
          </TabsContent>

          {/* ===== COMPOSANT 2: MARKETPLACE (ACHAT + VENTE) ===== */}
          <TabsContent value="marketplace">
            <Marketplace
              currentBalance={currentBalance}
              onBalanceUpdate={handleBalanceUpdate}
              inventory={inventory}
              onInventoryUpdate={handleInventoryUpdate}
            />
          </TabsContent>

          {/* ===== COMPOSANT 3: INVENTAIRE ===== */}
          <TabsContent value="inventory">
            <Inventory inventory={inventory} onSellItem={handleSellFromInventory} />
          </TabsContent>
        </Tabs>
      </div>
      </div>
      </>
  )
}
