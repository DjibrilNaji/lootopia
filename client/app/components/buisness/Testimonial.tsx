/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent } from "../ui/card"

const Testimonial = () => {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-uniSansItalic mb-4">Ce que disent nos aventuriers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les expériences de ceux qui ont déjà participé à nos chasses au trésor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie L.",
                role: "Aventurière passionnée",
                quote: "Une expérience incroyable ! J'ai redécouvert ma ville sous un angle complètement nouveau.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974"
              },
              {
                name: "Thomas M.",
                role: "Père de famille",
                quote: "Mes enfants adorent ! C'est une façon ludique de les faire sortir et d'explorer ensemble.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
              },
              {
                name: "Julie R.",
                role: "Créatrice de contenu",
                quote: "L'éditeur est super intuitif, j'ai pu créer une chasse au trésor pour l'anniversaire de mon ami.",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200">
                      <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }
export { Testimonial}