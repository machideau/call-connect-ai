
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useToast } from '@/hooks/use-toast';

interface ProfileTabProps {
  loading: boolean;
  onSave: () => void;
}

const ProfileTab = ({ loading, onSave }: ProfileTabProps) => {
  const [avatarSrc, setAvatarSrc] = useState<string>('/placeholder.svg');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Type de fichier non valide",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximum est de 5Mo",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarSrc(event.target.result as string);
        toast({
          title: "Photo téléchargée",
          description: "Votre photo de profil a été mise à jour",
        });
      }
    };
    reader.readAsDataURL(file);
  };

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
              <AvatarImage src={avatarSrc} alt="Photo de profil" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Input 
              id="profile-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
              disabled={loading}
            />
            <label htmlFor="profile-upload">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <div>
                  <Upload className="h-4 w-4 mr-2" />
                  Changer
                </div>
              </Button>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="firstname">Prénom</Label>
              <Input id="firstname" defaultValue="Jean" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastname">Nom</Label>
              <Input id="lastname" defaultValue="Dupont" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="jean.dupont@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" defaultValue="+33 6 12 34 56 78" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Poste</Label>
              <Input id="position" defaultValue="Directeur Commercial" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger id="language">
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
