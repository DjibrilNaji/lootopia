/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"

import { useState } from "react"
import { Button } from "~/client/components/ui/button"
import { Card, CardContent } from "~/client/components/ui/card"
import { Badge } from "~/client/components/ui/badge"
import { Input } from "~/client/components/ui/input"
import {
  Crown,
  CreditCard,
  Smartphone,
  CheckCircle,
  Loader2,
  X,
  Lock,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  package: any
  onSuccess: (packageData: any) => void
  currentBalance: number
}

type PaymentStep = "selection" | "stripe-form" | "klarna-form" | "klarna-verification" | "processing" | "success"

export function PaymentModal({ isOpen, onClose, package: pkg, onSuccess, currentBalance }: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("selection")
  const [selectedMethod, setSelectedMethod] = useState<"stripe" | "klarna" | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Stripe form data
  const [stripeData, setStripeData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
  })

  // Klarna form data
  const [klarnaData, setKlarnaData] = useState({
    email: "",
    phone: "",
    selectedPlan: "",
    verificationCode: "",
  })

  // Code de vérification généré (simulation)
  const [generatedCode] = useState("834092")

  if (!isOpen || !pkg) return null

  const totalCrowns = pkg.crowns + (pkg.bonus || 0)

  const handleMethodSelection = (method: "stripe" | "klarna") => {
    setSelectedMethod(method)
    setCurrentStep(method === "stripe" ? "stripe-form" : "klarna-form")
  }

  const handleStripePayment = async () => {
    setCurrentStep("processing")
    setIsProcessing(true)

    // Simulation du paiement Stripe
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setCurrentStep("success")
    setIsProcessing(false)

    // Attendre l'animation de succès puis fermer
    setTimeout(() => {
      const newBalance = currentBalance + totalCrowns
      console.log("💳 Stripe - Nouveau solde calculé:", currentBalance, "+", totalCrowns, "=", newBalance)

      const packageData = {
        name: pkg.name,
        totalCrowns,
        price: pkg.price,
        bonus: pkg.bonus || 0,
        method: "stripe",
        newBalance,
      }

      

      onSuccess(packageData)
      resetModal()
    }, 2000)
  }


 
  const handleKlarnaSubmit = async () => {
    setCurrentStep("processing")
    setIsProcessing(true)

    // Simulation de l'envoi du SMS
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setCurrentStep("klarna-verification")
    setIsProcessing(false)
  }

  const handleKlarnaVerification = async () => {
    if (klarnaData.verificationCode !== generatedCode) {
      // Code incorrect
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            type: "error",
            title: "Code incorrect",
            description: "Le code de vérification saisi est incorrect. Réessayez.",
          },
        }),
      )
      return
    }

    setCurrentStep("processing")
    setIsProcessing(true)

    // Simulation du paiement Klarna
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setCurrentStep("success")
    setIsProcessing(false)

    // Attendre l'animation de succès puis fermer
    setTimeout(() => {
      const newBalance = currentBalance + totalCrowns
      console.log("📱 Klarna - Nouveau solde calculé:", currentBalance, "+", totalCrowns, "=", newBalance)

      const packageData = {
        name: pkg.name,
        totalCrowns,
        price: pkg.price,
        bonus: pkg.bonus || 0,
        method: "klarna",
        plan: klarnaData.selectedPlan,
        newBalance,
      }

    
      onSuccess(packageData)
      resetModal()
    }, 2000)
  }

  const resetModal = () => {
    setCurrentStep("selection")
    setSelectedMethod(null)
    setIsProcessing(false)
    setKlarnaData({ ...klarnaData, verificationCode: "" })
  }

  const handleClose = () => {
    if (!isProcessing) {
      resetModal()
      onClose()
    }
  }

  const goBack = () => {
    if (currentStep === "stripe-form" || currentStep === "klarna-form") {
      setCurrentStep("selection")
      setSelectedMethod(null)
    } else if (currentStep === "klarna-verification") {
      setCurrentStep("klarna-form")
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const formatVerificationCode = (value: string) => {
    return value.replace(/\D/g, "").substring(0, 6)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="flex items-center gap-3">
            {currentStep !== "selection" && currentStep !== "success" && (
              <Button variant="ghost" size="sm" onClick={goBack} disabled={isProcessing} className="h-8 w-8 p-0">
                ←
              </Button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStep === "selection" && "Finaliser l'achat"}
              {currentStep === "stripe-form" && "Paiement par carte"}
              {currentStep === "klarna-form" && "Paiement Klarna"}
              {currentStep === "klarna-verification" && "Vérification SMS"}
              {currentStep === "processing" && "Traitement..."}
              {currentStep === "success" && "Paiement réussi !"}
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose} disabled={isProcessing} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Package Summary - Always visible */}
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    <span className="text-lg font-semibold text-yellow-600">{totalCrowns} Couronnes</span>
                    {pkg.bonus && <Badge className="bg-green-100 text-green-800">+{pkg.bonus} bonus</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{pkg.price}€</div>
                  <div className="text-sm text-gray-500">Solde actuel: {currentBalance.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          {currentStep === "selection" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Choisissez votre méthode de paiement</h3>

              {/* Stripe */}
              <Card className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <Button
                    onClick={() => handleMethodSelection("stripe")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      Payer par carte bancaire
                      <Badge className="bg-blue-100 text-blue-800 ml-auto">Instantané</Badge>
                    </div>
                  </Button>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Visa, Mastercard, American Express • Paiement sécurisé SSL
                  </p>
                </CardContent>
              </Card>

              {/* Klarna */}
              <Card className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-pink-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <Button
                    onClick={() => handleMethodSelection("klarna")}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 text-lg font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-6 w-6" />
                      Payer avec Klarna
                      <Badge className="bg-pink-100 text-pink-800 ml-auto">3x sans frais</Badge>
                    </div>
                  </Button>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Payez en 3 fois sans frais • Vérification par SMS • Approuvé instantanément
                  </p>
                </CardContent>
              </Card>

              {/* Security Info */}
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4 text-green-500" />
                  <span>Paiement 100% sécurisé • Chiffrement SSL 256-bit • Données protégées</span>
                </div>
              </div>
            </div>
          )}

          {/* Stripe Form */}
          {currentStep === "stripe-form" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <CreditCard className="h-5 w-5" />
                <span className="font-semibold">Paiement sécurisé par Stripe</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={stripeData.email}
                    onChange={(e) => setStripeData({ ...stripeData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de carte</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={stripeData.cardNumber}
                      onChange={(e) => setStripeData({ ...stripeData, cardNumber: formatCardNumber(e.target.value) })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full pl-10"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Utilisez 4242 4242 4242 4242 pour les tests</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration</label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={stripeData.expiryDate}
                        onChange={(e) => setStripeData({ ...stripeData, expiryDate: formatExpiryDate(e.target.value) })}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full pl-10"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <Input
                      type="text"
                      value={stripeData.cvv}
                      onChange={(e) => setStripeData({ ...stripeData, cvv: e.target.value.replace(/\D/g, "") })}
                      placeholder="123"
                      maxLength={4}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom sur la carte</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={stripeData.cardName}
                      onChange={(e) => setStripeData({ ...stripeData, cardName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStripePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold mt-6"
              >
                <Lock className="h-5 w-5 mr-2" />
                Payer {pkg.price}€ maintenant
              </Button>
            </div>
          )}

          {/* Klarna Form */}
          {currentStep === "klarna-form" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-pink-600 mb-4">
                <Smartphone className="h-5 w-5" />
                <span className="font-semibold">Paiement flexible avec Klarna</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={klarnaData.email}
                    onChange={(e) => setKlarnaData({ ...klarnaData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <Input
                    type="tel"
                    value={klarnaData.phone}
                    onChange={(e) => setKlarnaData({ ...klarnaData, phone: e.target.value })}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Un code de vérification sera envoyé par SMS</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Plan de paiement</label>
                  <div className="space-y-3">
                    {/* 3x sans frais */}
                    <Card
                      className={`cursor-pointer transition-all border-2 ${
                        klarnaData.selectedPlan === "3x"
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                      onClick={() => setKlarnaData({ ...klarnaData, selectedPlan: "3x" })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">Payez en 3 fois sans frais</div>
                            <div className="text-sm text-gray-600">
                              3 × {(pkg.price / 3).toFixed(2)}€ • Tous les 30 jours
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Recommandé</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payez plus tard */}
                    <Card
                      className={`cursor-pointer transition-all border-2 ${
                        klarnaData.selectedPlan === "later"
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                      onClick={() => setKlarnaData({ ...klarnaData, selectedPlan: "later" })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">Payez dans 30 jours</div>
                            <div className="text-sm text-gray-600">{pkg.price}€ • Aucun frais si payé à temps</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleKlarnaSubmit}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 text-lg font-semibold mt-6"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Envoyer le code de vérification
              </Button>

              <div className="text-xs text-gray-500 text-center">
                En continuant, vous acceptez les conditions d'utilisation de Klarna
              </div>
            </div>
          )}

          {/* Klarna Verification */}
          {currentStep === "klarna-verification" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-pink-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Code de vérification envoyé</h3>
                <p className="text-gray-600 mb-4">
                  Nous avons envoyé un code à 6 chiffres au numéro <br />
                  <span className="font-semibold">{klarnaData.phone}</span>
                </p>
              </div>

              <div className="max-w-xs mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Saisissez le code de vérification
                </label>
                <Input
                  type="text"
                  value={klarnaData.verificationCode}
                  onChange={(e) =>
                    setKlarnaData({ ...klarnaData, verificationCode: formatVerificationCode(e.target.value) })
                  }
                  placeholder="Entrez le code ici"
                  maxLength={6}
                  className="w-full text-center text-2xl font-mono tracking-widest"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Le code expire dans 5 minutes. Si vous ne le recevez pas, cliquez sur "Renvoyer le code".
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleKlarnaVerification}
                  disabled={klarnaData.verificationCode.length !== 6}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 text-lg font-semibold disabled:opacity-50"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Vérifier et payer
                </Button>

                <Button variant="outline" onClick={() => setCurrentStep("klarna-form")} className="w-full">
                  Renvoyer le code
                </Button>
              </div>
            </div>
          )}

          {/* Processing */}
          {currentStep === "processing" && (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-6 animate-spin" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Traitement du paiement...</h3>
              <p className="text-gray-600 mb-4">
                {selectedMethod === "stripe"
                  ? "Vérification de votre carte bancaire"
                  : currentStep === "processing" && selectedMethod === "klarna"
                    ? "Validation de votre code de vérification"
                    : "Validation de votre demande Klarna"}
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Lock className="h-4 w-4" />
                  <span>Transaction sécurisée en cours...</span>
                </div>
              </div>
            </div>
          )}

          {/* Success */}
          {currentStep === "success" && (
            <div className="text-center py-12">
              <div className="relative mb-6">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto animate-bounce" />
                <Crown className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Paiement Confirmé !</h3>
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg border-2 border-yellow-200 mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="h-6 w-6 text-yellow-600" />
                  <span className="text-3xl font-bold text-yellow-600">+{totalCrowns} Couronnes</span>
                </div>
                <p className="text-sm text-gray-600">
                  Payé avec {selectedMethod === "stripe" ? "Stripe" : "Klarna"} • Transaction sécurisée
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Nouveau solde : {(currentBalance + totalCrowns).toLocaleString()} Couronnes
                </p>
              </div>
              <p className="text-gray-600">Vos Couronnes ont été ajoutées à votre compte !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
