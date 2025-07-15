"use client"

import { useEffect, useState } from "react"
import { Crown, CheckCircle, AlertCircle, X, Gem, Badge } from "lucide-react"
import { Card, CardContent } from "../ui/card"

interface Toast {
  id: string
  type: "success" | "error" | "info"
  title: string
  description: string
  packageData?: {
    name: string
    price: number
    totalCrowns: number
    bonus: number
    method: "stripe" | "klarna"
  }
  artifactData?: ArtifactData
  duration?: number
}

interface ArtifactData {
  name: string
  price: number
  rarity: string
  seller: string
}

export function ToastSystem() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handleShowToast = (event: CustomEvent) => {
      const { type, title, description, packageData, artifactData, duration = 5000 } = event.detail

      const newToast: Toast = {
        id: Date.now().toString(),
        type,
        title,
        description,
        packageData,
        artifactData,
        duration,
      }

      setToasts((prev) => [...prev, newToast])

      // Auto-remove toast after duration
      setTimeout(() => {
        removeToast(newToast.id)
      }, duration)
    }

    window.addEventListener("showToast", handleShowToast as EventListener)

    return () => {
      window.removeEventListener("showToast", handleShowToast as EventListener)
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => setIsVisible(true), 50)
  }, [])

  const handleRemove = () => {
    setIsLeaving(true)
    setTimeout(() => onRemove(toast.id), 300)
  }

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100"
      case "error":
        return "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 shadow-red-100"
      default:
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-blue-100"
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      default:
        return <Crown className="h-6 w-6 text-blue-500" />
    }
  }

  return (
    <Card
      className={`
        ${getToastStyles()}
        border-2 shadow-xl transition-all duration-300 transform
        ${isVisible && !isLeaving ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}
        ${isLeaving ? "translate-x-full opacity-0 scale-95" : ""}
      `}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-gray-900 text-sm">{toast.title}</h4>
              {/* Removed duplicate Button, only keep the button element */}
              <button type="button" onClick={handleRemove} className="h-6 w-6 p-0 hover:bg-gray-200/50 rounded transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">{toast.description}</p>

            {/* Package Data Display */}
            {toast.packageData && (
              <div className="bg-white/70 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{toast.packageData.name}</span>
                  <span className="font-bold text-gray-900">{toast.packageData.price}€</span>
                </div>

                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-600" />
                  <span className="font-bold text-yellow-600">{toast.packageData.totalCrowns} Couronnes</span>
                  {toast.packageData.bonus > 0 && (
                    <Badge className="bg-green-100 text-green-800 text-xs">+{toast.packageData.bonus} bonus</Badge>
                  )}
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Payé via {toast.packageData.method === "stripe" ? "Stripe" : "Klarna"}
                </div>
              </div>
            )}

            {/* Artifact Data Display */}
            {toast.artifactData && (
              <div className="bg-white/70 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{toast.artifactData.name}</span>
                  <div className="flex items-center gap-1">
                    <Crown className="h-4 w-4 text-yellow-600" />
                    <span className="font-bold text-yellow-600">{toast.artifactData.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Gem className="h-4 w-4 text-purple-500" />
                  <Badge className={`text-xs ${getRarityColor(toast.artifactData.rarity)}`}>
                    {toast.artifactData.rarity}
                  </Badge>
                  <span className="text-xs text-gray-500">par {toast.artifactData.seller}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getRarityColor(rarity: string) {
  switch (rarity) {
    case "legendary":
      return "bg-yellow-100 text-yellow-800"
    case "epic":
      return "bg-purple-100 text-purple-800"
    case "rare":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
