
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Bell, Shield, Users, Key, CreditCard, LogOut, Upload, User, Building } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Paramètres mis à jour",
        description: "Vos modifications ont été enregistrées avec succès"
      });
    }, 1000);
  };

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="company">Entreprise</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Facturation</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Modifiez vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Photo de profil" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Changer
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <FormLabel>Prénom</FormLabel>
                  <Input defaultValue="Jean" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Nom</FormLabel>
                  <Input defaultValue="Dupont" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <Input defaultValue="jean.dupont@example.com" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Téléphone</FormLabel>
                  <Input defaultValue="+33 6 12 34 56 78" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Poste</FormLabel>
                  <Input defaultValue="Directeur Commercial" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Langue</FormLabel>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="company" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de l'entreprise</CardTitle>
            <CardDescription>
              Ces informations seront utilisées pour personnaliser votre expérience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Logo entreprise" />
                  <AvatarFallback>ABC</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Logo
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <FormLabel>Nom de l'entreprise</FormLabel>
                  <Input defaultValue="Entreprise ABC" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Secteur d'activité</FormLabel>
                  <Select defaultValue="tech">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technologie</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="retail">Commerce de détail</SelectItem>
                      <SelectItem value="health">Santé</SelectItem>
                      <SelectItem value="education">Éducation</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Site web</FormLabel>
                  <Input defaultValue="https://www.exemple.com" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Taille de l'entreprise</FormLabel>
                  <Select defaultValue="small">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une taille" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="micro">1-9 employés</SelectItem>
                      <SelectItem value="small">10-49 employés</SelectItem>
                      <SelectItem value="medium">50-249 employés</SelectItem>
                      <SelectItem value="large">250+ employés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2 space-y-2">
                  <FormLabel>Description de l'entreprise</FormLabel>
                  <Textarea 
                    defaultValue="Entreprise spécialisée dans les solutions innovantes de gestion de la relation client."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Changer le mot de passe</CardTitle>
            <CardDescription>
              Mettez à jour votre mot de passe pour sécuriser votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Mot de passe actuel</FormLabel>
              <Input type="password" />
            </div>
            
            <div className="space-y-2">
              <FormLabel>Nouveau mot de passe</FormLabel>
              <Input type="password" />
            </div>
            
            <div className="space-y-2">
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <Input type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} disabled={loading}>
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
      </TabsContent>
      
      <TabsContent value="notifications" className="space-y-6">
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
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer les préférences'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="billing" className="space-y-6">
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
      </TabsContent>
    </Tabs>
  );
};

export default Settings;
