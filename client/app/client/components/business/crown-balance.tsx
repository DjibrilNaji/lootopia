"use client"

import { useState, useEffect } from "react"
import { Crown, TrendingUp } from "lucide-react"

interface CrownBalanceProps {
  initialBalance?: number
}

export function CrownBalance({ initialBalance = 1500 }: CrownBalanceProps) {
  const [balance, setBalance] = useState(initialBalance)
  const [isAnimating, setIsAnimating] = useState(false)
  const [previousBalance, setPreviousBalance] = useState(initialBalance)
  const [showIncrease, setShowIncrease] = useState(false)

  // Fonction pour mettre à jour le solde avec animation
  const updateBalance = (newBalance: number) => {
    console.log("🔄 Mise à jour du solde:", balance, "→", newBalance)

    if (newBalance > balance) {
      setPreviousBalance(balance)
      setShowIncrease(true)
      setIsAnimating(true)

      // Animation progressive du compteur
      const difference = newBalance - balance
      const steps = 30
      const increment = difference / steps
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const currentValue = balance + increment * currentStep

        if (currentStep >= steps) {
          setBalance(newBalance)
          clearInterval(timer)
          setTimeout(() => {
            setIsAnimating(false)
            setShowIncrease(false)
          }, 1000)
        } else {
          setBalance(Math.floor(currentValue))
        }
      }, 50)
    } else {
      setBalance(newBalance)
    }
  }

  // Écouter les mises à jour du solde
  useEffect(() => {
    console.log("🎧 CrownBalance: Écoute des événements activée")

    const handleBalanceUpdate = (event: CustomEvent) => {
      console.log("📨 Événement reçu:", event.detail)
      updateBalance(event.detail.newBalance)
    }

    // Écouter l'événement personnalisé
    window.addEventListener("crownBalanceUpdate", handleBalanceUpdate as EventListener)

    // Nettoyage
    return () => {
      console.log("🧹 CrownBalance: Nettoyage des événements")
      window.removeEventListener("crownBalanceUpdate", handleBalanceUpdate as EventListener)
    }
  }, [balance, updateBalance])

  // Fonction de test pour vérifier la mise à jour

  return (
    <div className="flex items-center gap-3">
      {/* Affichage du solde avec animation */}
      <div className="relative flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-lg px-4 py-2 shadow-sm">
        <Crown className={`h-5 w-5 text-yellow-600 ${isAnimating ? "animate-bounce" : ""}`} />

        <div className="flex flex-col items-center">
          <span
            className={`font-bold text-yellow-800 text-lg transition-all duration-300 ${
              isAnimating ? "scale-110 text-yellow-600" : ""
            }`}
          >
            {balance.toLocaleString()}
          </span>
          <span className="text-xs text-yellow-600 font-medium -mt-1">Couronnes</span>
        </div>

        {/* Animation d'augmentation */}
        {showIncrease && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />+{(balance - previousBalance).toLocaleString()}
            </div>
          </div>
        )}

        {/* Effet de particules lors de l'achat */}
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${10 + (i % 2) * 20}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "1s",
                }}
              >
                <Crown className="h-3 w-3 text-yellow-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Fonction utilitaire pour déclencher une mise à jour du solde
export function triggerCrownBalanceUpdate(newBalance: number) {
  console.log("🚀 Déclenchement de l'événement crownBalanceUpdate:", newBalance)

  const event = new CustomEvent("crownBalanceUpdate", {
    detail: { newBalance },
  })

  window.dispatchEvent(event)
  console.log("✅ Événement envoyé")
}
