
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="container py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Déléguez vos appels à l'intelligence artificielle
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            Transformez votre standard téléphonique avec une IA conversationnelle 
            qui répond à vos clients selon vos instructions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-lg">
                Essai gratuit de 3 jours
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg">
                Demander une démo
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Aucune carte bancaire n'est requise pour l'essai gratuit
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-transparent to-background h-12" />
    </div>
  );
};

export default Hero;
