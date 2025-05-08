
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-16 hero-gradient text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à transformer votre standard téléphonique ?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Commencez dès aujourd'hui avec notre essai gratuit de 3 jours
            et découvrez la puissance de l'IA pour la gestion de vos appels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-lg">
                Démarrer l'essai gratuit
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
