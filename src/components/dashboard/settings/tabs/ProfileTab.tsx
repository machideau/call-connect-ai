
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProfileTabProps {
  loading: boolean;
  onSave: () => void;
}

const ProfileTab = ({ loading, onSave }: ProfileTabProps) => {
  return (
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
        <Button onClick={onSave} disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileTab;
