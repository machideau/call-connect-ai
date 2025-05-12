
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { LogOut, Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SecurityTabProps {
  loading: boolean;
  onSave: () => void;
}

const SecurityTab = ({ loading, onSave }: SecurityTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Changer le mot de passe</CardTitle>
          <CardDescription>
            Mettez à jour votre mot de passe pour sécuriser votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mot de passe actuel</label>
            <Input type="password" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Nouveau mot de passe</label>
            <Input type="password" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
            <Input type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Authentification à deux facteurs</CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Authentification par SMS</div>
              <div className="text-sm text-gray-500">
                Recevez un code de vérification par SMS lors de la connexion
              </div>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Authentification par application</div>
              <div className="text-sm text-gray-500">
                Utilisez une application d'authentification comme Google Authenticator
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sessions actives</CardTitle>
          <CardDescription>
            Gérez les appareils connectés à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Chrome sur MacBook Pro</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Actif maintenant • Paris, France
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Cet appareil
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Safari sur iPhone</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Il y a 2 heures • Paris, France
                </div>
              </div>
              <Button variant="outline" size="sm">
                Déconnecter
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Firefox sur Windows PC</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Il y a 5 jours • Lyon, France
                </div>
              </div>
              <Button variant="outline" size="sm">
                Déconnecter
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnecter toutes les autres sessions
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default SecurityTab;
