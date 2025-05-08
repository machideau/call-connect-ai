
import { Phone, Database, Cpu, MessageSquare, FileText, Volume2, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string; 
  color: string;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className={`h-12 w-12 ${color} rounded-lg flex items-center justify-center mb-5`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeatureSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => {
  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

const FeatureDetails = () => {
  const mainFeatures = [
    {
      icon: Phone,
      title: "Réponses IA automatisées",
      description: "Notre IA répond aux appels avec des informations précises basées sur les données de votre entreprise.",
      color: "bg-brand-600"
    },
    {
      icon: Database,
      title: "Téléchargement de documents",
      description: "Importez vos documents commerciaux pour que l'IA puisse s'en servir comme base de connaissances.",
      color: "bg-teal-600"
    },
    {
      icon: Volume2,
      title: "Personnalisation vocale",
      description: "Choisissez parmi nos voix professionnelles ou créez votre propre voix personnalisée.",
      color: "bg-purple-600"
    },
    {
      icon: Clock,
      title: "Disponibilité 24/7",
      description: "Notre IA répond aux appels à toute heure, sans congés ni pauses, assurant une disponibilité permanente.",
      color: "bg-blue-600"
    }
  ];

  const advancedFeatures = [
    {
      icon: MessageSquare,
      title: "Mémoire conversationnelle",
      description: "L'IA mémorise les interactions précédentes pour offrir un service personnalisé aux clients réguliers.",
      color: "bg-pink-600"
    },
    {
      icon: Cpu,
      title: "Compréhension contextuelle",
      description: "Notre IA comprend le contexte des conversations pour fournir des réponses plus pertinentes et naturelles.",
      color: "bg-amber-600"
    },
    {
      icon: FileText,
      title: "Transcriptions d'appels",
      description: "Accédez aux transcriptions détaillées de tous les appels pour analyse et suivi.",
      color: "bg-emerald-600"
    },
    {
      icon: Check,
      title: "Intégration facile",
      description: "Intégrez CallIA à vos systèmes existants sans perturber votre infrastructure actuelle.",
      color: "bg-indigo-600"
    }
  ];

  const comparisonItems = [
    {
      traditional: "Heures d'ouverture limitées",
      callia: "Disponibilité 24/7 sans interruption"
    },
    {
      traditional: "Formation du personnel coûteuse",
      callia: "IA pré-entraînée, pas de formation requise"
    },
    {
      traditional: "Capacité d'appels limitée",
      callia: "Gestion simultanée de multiples appels"
    },
    {
      traditional: "Qualité de service variable",
      callia: "Réponses cohérentes et professionnelles"
    },
    {
      traditional: "Coûts fixes élevés",
      callia: "Tarification flexible selon l'usage"
    }
  ];

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-brand-600 to-teal-600 py-20 text-white">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fonctionnalités avancées de CallIA
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Découvrez comment notre plateforme d'IA transforme la gestion des appels téléphoniques pour les entreprises modernes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                  Commencer l'essai gratuit
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main features section */}
      <FeatureSection 
        title="Fonctionnalités principales"
        description="CallIA offre des solutions innovantes pour automatiser et améliorer votre gestion d'appels."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </FeatureSection>
      
      {/* Advanced features section */}
      <FeatureSection 
        title="Fonctionnalités avancées"
        description="Explorez nos capacités avancées qui définissent une nouvelle norme dans l'automatisation des appels."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advancedFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </FeatureSection>
      
      {/* Comparison section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              CallIA vs. Méthodes traditionnelles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comparez notre solution innovante aux systèmes de réponse téléphonique traditionnels.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-2 bg-gray-100 font-semibold">
              <div className="p-4 border-r border-gray-200">Méthodes traditionnelles</div>
              <div className="p-4 text-brand-600">CallIA</div>
            </div>
            
            {comparisonItems.map((item, index) => (
              <div key={index} className="grid grid-cols-2 border-t border-gray-200">
                <div className="p-4 border-r border-gray-200 text-gray-600">{item.traditional}</div>
                <div className="p-4">{item.callia}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre service client ?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Essayez CallIA gratuitement pendant 3 jours et découvrez comment notre intelligence artificielle peut optimiser votre gestion d'appels.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                Démarrer votre essai gratuit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureDetails;
