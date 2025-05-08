
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanFeature {
  included: boolean;
  text: string;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
}

const PricingCard = ({ plan }: { plan: Plan }) => {
  return (
    <div className={`pricing-card ${plan.popular ? 'border-brand-500 ring-1 ring-brand-500' : ''}`}>
      {plan.popular && (
        <span className="absolute top-0 transform -translate-y-1/2 bg-brand-600 text-white px-3 py-1 text-sm rounded-full">
          Le plus populaire
        </span>
      )}
      
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{plan.price}</span>
        {plan.price !== 'Sur mesure' && <span className="text-gray-500">/mois</span>}
      </div>
      <p className="text-gray-600 mb-6">{plan.description}</p>
      
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className={`flex items-start ${!feature.included ? 'text-gray-400' : ''}`}>
            <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${feature.included ? 'text-brand-500' : 'text-gray-300'}`} />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <Link to="/signup">
        <Button 
          className={`w-full ${plan.popular ? 'bg-brand-600 hover:bg-brand-700' : 'bg-gray-800 hover:bg-gray-900'}`}
        >
          {plan.buttonText}
        </Button>
      </Link>
    </div>
  );
};

const Pricing = () => {
  const plans: Plan[] = [
    {
      name: "Débutant",
      price: "99€",
      description: "Idéal pour les petites entreprises et indépendants",
      features: [
        { included: true, text: "50 minutes d'appels par mois" },
        { included: true, text: "Mémoire conversationnelle" },
        { included: true, text: "Import de documents (max 50 pages)" },
        { included: true, text: "1 voix standard au choix" },
        { included: false, text: "Voix personnalisée" },
        { included: false, text: "Transfert d'appels" },
        { included: false, text: "API pour intégrations" }
      ],
      buttonText: "Démarrer l'essai gratuit"
    },
    {
      name: "Business",
      price: "299€",
      description: "Pour les PME avec un volume d'appels important",
      popular: true,
      features: [
        { included: true, text: "200 minutes d'appels par mois" },
        { included: true, text: "Mémoire conversationnelle avancée" },
        { included: true, text: "Import de documents (max 200 pages)" },
        { included: true, text: "5 voix standard au choix" },
        { included: true, text: "1 voix personnalisée" },
        { included: true, text: "Transfert d'appels" },
        { included: false, text: "API pour intégrations" }
      ],
      buttonText: "Démarrer l'essai gratuit"
    },
    {
      name: "Entreprise",
      price: "Sur mesure",
      description: "Solution complète pour grandes organisations",
      features: [
        { included: true, text: "Minutes d'appels illimitées" },
        { included: true, text: "Mémoire conversationnelle illimitée" },
        { included: true, text: "Import de documents illimité" },
        { included: true, text: "Toutes les voix standards" },
        { included: true, text: "Voix personnalisées illimitées" },
        { included: true, text: "Transfert d'appels avancé" },
        { included: true, text: "API pour intégrations complètes" }
      ],
      buttonText: "Contacter les ventes"
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Tarifs simples et transparents</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez l'offre qui correspond à vos besoins, avec la possibilité d'évoluer à tout moment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Tous les plans incluent l'essai gratuit de 3 jours. Annulez à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
