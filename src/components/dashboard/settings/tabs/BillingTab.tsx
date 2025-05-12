
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const BillingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Abonnement et facturation</CardTitle>
        <CardDescription>
          Gérez votre abonnement et consultez vos factures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">Plan Essai</h3>
              <p className="text-sm text-gray-600 mt-1">
                Votre essai gratuit se termine dans 2 jours
              </p>
            </div>
            <Badge>Actif</Badge>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-brand-600 h-1.5 rounded-full" 
                style={{ width: '33%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Jour 8 sur 10
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button>
              Passer au plan Pro
            </Button>
            <Button variant="outline">
              Voir les plans
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Méthodes de paiement</h3>
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-md">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Visa se terminant par 4242</p>
                  <p className="text-sm text-gray-500">Expire en 04/2025</p>
                </div>
              </div>
              <div>
                <Badge variant="outline">Par défaut</Badge>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-md">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">MasterCard se terminant par 5678</p>
                  <p className="text-sm text-gray-500">Expire en 08/2024</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Définir par défaut
              </Button>
            </div>
          </div>
          <Button variant="outline" className="mt-3">
            <CreditCard className="h-4 w-4 mr-2" />
            Ajouter une méthode de paiement
          </Button>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Historique des factures</h3>
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Mai 2024</p>
                <p className="text-sm text-gray-500">Plan Essai • Gratuit</p>
              </div>
              <Button variant="ghost" size="sm">
                Télécharger
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
