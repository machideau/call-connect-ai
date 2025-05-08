
import { Calendar, Check, Mail, Search, Settings, User } from "lucide-react";

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<any>; 
}) => {
  return (
    <div className="feature-card">
      <div className="h-12 w-12 bg-brand-100 rounded-lg flex items-center justify-center mb-5">
        <Icon className="h-6 w-6 text-brand-600" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Réponses IA automatisées",
      description: "Notre IA répond aux appels avec des informations précises basées sur les données de votre entreprise.",
      icon: Settings
    },
    {
      title: "Téléchargement de documents",
      description: "Importez vos documents commerciaux pour que l'IA puisse s'en servir comme base de connaissances.",
      icon: Calendar
    },
    {
      title: "Personnalisation vocale",
      description: "Choisissez parmi nos voix professionnelles ou créez votre propre voix personnalisée.",
      icon: User
    },
    {
      title: "Historique des conversations",
      description: "Accédez à l'historique complet et aux transcriptions de tous les appels gérés par l'IA.",
      icon: Search
    },
    {
      title: "Mémoire conversationnelle",
      description: "L'IA mémorise les interactions précédentes pour offrir un service personnalisé aux clients réguliers.",
      icon: Mail
    },
    {
      title: "Abonnements flexibles",
      description: "Choisissez l'offre qui convient à votre entreprise avec des options évolutives selon vos besoins.",
      icon: Check
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Fonctionnalités principales</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment CallIA peut transformer votre service client et optimiser
            votre gestion des appels téléphoniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
