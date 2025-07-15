import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { CheckCircle, Coins, ArrowRight, Home } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "~/client/components/ui/card"
import { Button } from "~/client/components/ui/button"

// eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-unused-vars
export async function loader(_: LoaderFunctionArgs) {
  // const url = new URL(request.url)
  // const packageId = url.searchParams.get("package")
  // const sessionId = url.searchParams.get("session_id")

  // Ici vous vérifieriez la session Stripe et mettriez à jour le solde utilisateur
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.retrieve(sessionId);

  // Données de démo
  const purchaseData = {
    packageName: "Pack Explorateur",
    goldPurchased: 500,
    bonusGold: 75,
    totalGold: 575,
    price: 39.99,
    newBalance: 575, // Nouveau solde total
    transactionId: "TXN_" + Date.now(),
  }

  return json({ purchase: purchaseData })
}

export default function GoldSuccessPage() {
  const { purchase } = useLoaderData<typeof loader>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <CheckCircle className="h-24 w-24 text-green-500 animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Coins className="h-8 w-8 text-yellow-500 animate-bounce" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-2">Achat Confirmé !</h1>
          <p className="text-xl text-gray-600">Vos Gold ont été ajoutés à votre compte</p>
        </div>

        {/* Purchase Details */}
        <Card className="mb-8 shadow-xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">Détails de l&apos;achat</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Package Info */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Package acheté</span>
                <span className="font-semibold text-lg">{purchase.packageName}</span>
              </div>

              {/* Gold Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gold de base</span>
                  <span className="font-semibold">{purchase.goldPurchased} Gold</span>
                </div>
                {purchase.bonusGold > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600">Gold bonus</span>
                    <span className="font-semibold text-green-600">+{purchase.bonusGold} Gold</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 border-t border-gray-100">
                  <span className="text-lg font-semibold">Total Gold reçu</span>
                  <span className="text-2xl font-bold text-yellow-600">{purchase.totalGold} Gold</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Montant payé</span>
                  <span className="font-semibold text-lg">{purchase.price}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ID Transaction</span>
                  <span className="font-mono text-sm text-gray-500">{purchase.transactionId}</span>
                </div>
              </div>

              {/* New Balance */}
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                <div className="text-center">
                  <Coins className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Votre nouveau solde</p>
                  <p className="text-4xl font-bold text-yellow-600">{purchase.newBalance} Gold</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
            <Link to="/marketplace" className="flex items-center justify-center gap-2">
              Aller à la Marketplace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to="/" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">
            Merci pour votre confiance ! Vos Gold sont maintenant disponibles pour acheter des artefacts rares sur{" "}
            <span className="font-bold text-yellow-600">Lootopia</span>.
          </p>
        </div>
      </div>
    </div>
  )
}