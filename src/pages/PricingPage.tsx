
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Pricing from '@/components/home/Pricing';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Des tarifs transparents pour tous vos besoins</h1>
              <p className="text-xl text-gray-600 mb-8">
                Choisissez l'offre qui correspond aux besoins de votre entreprise, avec possibilité d'évoluer à tout moment.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section - Reuse the existing component */}
        <Pricing />

        {/* Additional Benefits */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">Tous nos plans incluent</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="text-brand-600 h-6 w-6 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Support 24/7</h3>
                    <p className="text-gray-600">Assistance technique disponible par email et par chat à tout moment.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-brand-600 h-6 w-6 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Mise à jour régulières</h3>
                    <p className="text-gray-600">Bénéficiez des dernières améliorations de notre IA sans frais supplémentaires.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-brand-600 h-6 w-6 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Sécurité des données</h3>
                    <p className="text-gray-600">Chiffrement de bout en bout et conformité RGPD pour toutes vos données.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-brand-600 h-6 w-6 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Formation incluse</h3>
                    <p className="text-gray-600">Accès à des webinaires et documentation pour optimiser votre utilisation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">Questions fréquentes</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Comment fonctionne l'essai gratuit ?</h3>
                  <p className="text-gray-600">L'essai gratuit de 3 jours vous donne accès à toutes les fonctionnalités de l'offre Business. Aucune carte bancaire n'est requise pour commencer.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Puis-je changer d'offre à tout moment ?</h3>
                  <p className="text-gray-600">Oui, vous pouvez passer à une offre supérieure à tout moment. Le changement prend effet immédiatement et vous recevez une facture au prorata.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Quels types de documents puis-je importer ?</h3>
                  <p className="text-gray-600">Vous pouvez importer des documents au format .docx, .pdf, .txt et .xlsx. Notre IA peut s'entraîner à partir de ces contenus pour mieux répondre aux appels.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Les minutes d'appel non utilisées sont-elles reportées ?</h3>
                  <p className="text-gray-600">Non, les minutes d'appel sont valables pour le mois en cours et ne sont pas reportées au mois suivant.</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-4">Vous avez d'autres questions ?</h3>
                <Link to="/contact">
                  <Button variant="outline" size="lg">Contactez-nous</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
