"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/client/components/ui/card"
import { Button } from "~/client/components/ui/button"
import { Badge } from "~/client/components/ui/badge"
import { Crown, Zap, Gem, Star, Sparkles, CreditCard } from "lucide-react"
import { PaymentModal } from "~/client/components/business/payement-modal"

interface CrownPackage {
  id: string
  name: string
  crowns: number
  price: number
  bonus?: number
  popular?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>
  color: string
}

const crownPackages: CrownPackage[] = [
  {
    id: "bronze",
    name: "Pack Bronze",
    crowns: 50,
    price: 4.99,
    icon: Crown,
    color: "from-amber-400 to-amber-600",
  },
  {
    id: "silver",
    name: "Pack Argent",
    crowns: 120,
    price: 9.99,
    bonus: 10,
    icon: Zap,
    color: "from-gray-400 to-gray-600",
  },
  {
    id: "gold",
    name: "Pack Or",
    crowns: 250,
    price: 19.99,
    bonus: 30,
    popular: true,
    icon: Star,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: "platinum",
    name: "Pack Platine",
    crowns: 500,
    price: 39.99,
    bonus: 75,
    icon: Gem,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: "diamond",
    name: "Pack Diamant",
    crowns: 1000,
    price: 69.99,
    bonus: 200,
    icon: Sparkles,
    color: "from-blue-400 to-blue-600",
  },
]

interface CrownPurchaseProps {
  currentBalance: number
  onBalanceUpdate: (newBalance: number) => void
}

export function CrownPurchase({ currentBalance, onBalanceUpdate }: CrownPurchaseProps) {
  const [selectedPackage, setSelectedPackage] = useState<CrownPackage | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const handleBuyPackage = (pkg: CrownPackage) => {
    console.log("🔵 CrownPurchase: Ouverture PaymentModal pour", pkg.name)
    setSelectedPackage(pkg)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentModalClose = () => {
    console.log("🔵 CrownPurchase: Fermeture PaymentModal")
    setIsPaymentModalOpen(false)
    setSelectedPackage(null)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaymentSuccess = (packageData: any) => {
    console.log("✅ CrownPurchase: Paiement réussi", packageData)

    // Fermer le modal
    setIsPaymentModalOpen(false)
    setSelectedPackage(null)

    // Mettre à jour le solde
    onBalanceUpdate(packageData.newBalance)

    // Toast de succès
    window.dispatchEvent(
      new CustomEvent("showToast", {
        detail: {
          type: "success",
          title: "Achat réussi !",
          description: `+${packageData.totalCrowns} Couronnes ajoutées à votre compte`,
          packageData,
        },
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CreditCard className="h-8 w-8 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900">Choisissez votre pack de Couronnes</h2>
        </div>
        <p className="text-gray-600">Plus vous achetez, plus vous économisez avec nos bonus exclusifs !</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {crownPackages.map((pkg) => {
          const IconComponent = pkg.icon
          const totalCrowns = pkg.crowns + (pkg.bonus || 0)

          return (
            <Card
              key={pkg.id}
              className={`relative transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                pkg.popular ? "ring-2 ring-yellow-400 shadow-xl scale-105" : "hover:shadow-xl"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold px-4 py-1">
                  ⭐ POPULAIRE
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-4 bg-gradient-to-br ${pkg.color} rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{pkg.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-gray-800">{pkg.price}€</CardDescription>
              </CardHeader>

              <CardContent className="text-center space-y-4">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-yellow-600">{pkg.crowns}</div>
                  <div className="text-sm text-gray-500">Couronnes de base</div>

                  {pkg.bonus && (
                    <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                      <div className="text-lg font-bold text-green-600">+{pkg.bonus}</div>
                      <div className="text-xs text-green-500">Bonus gratuit!</div>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <div className="text-2xl font-bold text-gray-900">{totalCrowns}</div>
                    <div className="text-sm text-gray-500">Total reçu</div>
                  </div>
                </div>

                <Button
                  onClick={() => handleBuyPackage(pkg)}
                  className={`w-full font-bold py-3 transition-all duration-300 ${
                    pkg.popular
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg"
                      : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black"
                  }`}
                >
                  Acheter maintenant
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* PaymentModal isolé dans ce composant */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
        package={selectedPackage}
        onSuccess={handlePaymentSuccess}
        currentBalance={currentBalance}
      />
    </div>
  )
}
