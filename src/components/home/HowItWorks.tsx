
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Créez un compte",
      description: "Inscrivez-vous pour accéder à notre plateforme et commencer votre essai gratuit de 3 jours."
    },
    {
      number: "02",
      title: "Importez vos données",
      description: "Téléchargez des documents, ajoutez des liens vers votre site et définissez votre standard téléphonique."
    },
    {
      number: "03",
      title: "Personnalisez votre IA",
      description: "Choisissez une voix, configurez les comportements de réponse et testez le système."
    },
    {
      number: "04",
      title: "Activez le service",
      description: "Lancez votre standard IA et commencez à recevoir des appels automatiquement gérés."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comment ça fonctionne</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mettre en place votre standard téléphonique IA est simple et rapide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl shadow-sm p-8 h-full">
                <div className="text-3xl font-bold text-brand-600 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
