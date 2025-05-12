
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import ProfileTab from './tabs/ProfileTab';
import CompanyTab from './tabs/CompanyTab';
import SecurityTab from './tabs/SecurityTab';
import NotificationsTab from './tabs/NotificationsTab';
import BillingTab from './tabs/BillingTab';

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
        <ProfileTab loading={loading} onSave={handleSaveSettings} />
      </TabsContent>
      
      <TabsContent value="company" className="space-y-6">
        <CompanyTab loading={loading} onSave={handleSaveSettings} />
      </TabsContent>
      
      <TabsContent value="security" className="space-y-6">
        <SecurityTab loading={loading} onSave={handleSaveSettings} />
      </TabsContent>
      
      <TabsContent value="notifications" className="space-y-6">
        <NotificationsTab loading={loading} onSave={handleSaveSettings} />
      </TabsContent>
      
      <TabsContent value="billing" className="space-y-6">
        <BillingTab />
      </TabsContent>
    </Tabs>
  );
};

export default Settings;
