
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

interface CompanyTabProps {
  loading: boolean;
  onSave: () => void;
}

const CompanyTab = ({ loading, onSave }: CompanyTabProps) => {
  const [logoSrc, setLogoSrc] = useState<string>('/placeholder.svg');
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
        setLogoSrc(event.target.result as string);
        toast({
          title: "Logo téléchargé",
          description: "Le logo de votre entreprise a été mis à jour",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
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
              <AvatarImage src={logoSrc} alt="Logo entreprise" />
              <AvatarFallback>ABC</AvatarFallback>
            </Avatar>
            <Input 
              id="logo-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
              disabled={loading}
            />
            <label htmlFor="logo-upload">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <div>
                  <Upload className="h-4 w-4 mr-2" />
                  Logo
                </div>
              </Button>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de l'entreprise</Label>
              <Input id="company-name" defaultValue="Entreprise ABC" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Secteur d'activité</Label>
              <Select defaultValue="tech">
                <SelectTrigger id="industry">
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
              <Label htmlFor="website">Site web</Label>
              <Input id="website" defaultValue="https://www.exemple.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-size">Taille de l'entreprise</Label>
              <Select defaultValue="small">
                <SelectTrigger id="company-size">
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
              <Label htmlFor="company-desc">Description de l'entreprise</Label>
              <Textarea 
                id="company-desc"
                defaultValue="Entreprise spécialisée dans les solutions innovantes de gestion de la relation client."
                rows={4}
              />
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

export default CompanyTab;
