
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface NotificationsTabProps {
  loading: boolean;
  onSave: () => void;
}

const NotificationsTab = ({ loading, onSave }: NotificationsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notification</CardTitle>
        <CardDescription>
          Configurez comment et quand vous souhaitez être notifié
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Notifications par email</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Appels manqués</div>
                <div className="text-sm text-gray-500">
                  Recevez un email pour chaque appel manqué
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Rapports hebdomadaires</div>
                <div className="text-sm text-gray-500">
                  Résumé hebdomadaire des appels et conversations
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Nouveautés et mises à jour</div>
                <div className="text-sm text-gray-500">
                  Informations sur les nouvelles fonctionnalités et améliorations
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Notifications dans l'application</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Appels entrants</div>
                <div className="text-sm text-gray-500">
                  Notification pour chaque appel entrant
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Nouvelles conversations</div>
                <div className="text-sm text-gray-500">
                  Notification pour chaque nouvelle conversation
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Alertes système</div>
                <div className="text-sm text-gray-500">
                  Notifications concernant le statut du système
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer les préférences'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsTab;
