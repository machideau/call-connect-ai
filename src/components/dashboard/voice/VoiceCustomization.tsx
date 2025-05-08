
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { User } from 'lucide-react';

interface VoiceOption {
  id: string;
  name: string;
  gender: 'masculine' | 'feminine' | 'neutral';
  language: 'fr' | 'en' | 'es' | 'de' | 'it';
  preview: string;
}

const predefinedVoices: VoiceOption[] = [
  { id: 'v1', name: 'Sophie', gender: 'feminine', language: 'fr', preview: '' },
  { id: 'v2', name: 'Michel', gender: 'masculine', language: 'fr', preview: '' },
  { id: 'v3', name: 'Claire', gender: 'feminine', language: 'fr', preview: '' },
  { id: 'v4', name: 'Thomas', gender: 'masculine', language: 'fr', preview: '' },
  { id: 'v5', name: 'Emma', gender: 'feminine', language: 'en', preview: '' },
  { id: 'v6', name: 'James', gender: 'masculine', language: 'en', preview: '' },
];

const VoiceCard = ({ 
  voice, 
  isSelected, 
  onSelect, 
  onPlay 
}: { 
  voice: VoiceOption; 
  isSelected: boolean; 
  onSelect: () => void;
  onPlay: () => void;
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50' 
          : 'hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{voice.name}</h3>
          <p className="text-sm text-gray-500">
            {voice.gender === 'masculine' ? 'Masculin' : voice.gender === 'feminine' ? 'Féminin' : 'Neutre'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {voice.language === 'fr' ? 'Français' : 
             voice.language === 'en' ? 'Anglais' : 
             voice.language === 'es' ? 'Espagnol' : 
             voice.language === 'de' ? 'Allemand' : 'Italien'}
          </p>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          Écouter
        </Button>
      </div>
    </div>
  );
};

const VoiceCustomization = () => {
  const [selectedTab, setSelectedTab] = useState('predefined');
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Custom voice fields
  const [customVoiceName, setCustomVoiceName] = useState('');
  const [customVoiceGender, setCustomVoiceGender] = useState<string>('');
  const [customVoiceFiles, setCustomVoiceFiles] = useState<File[]>([]);
  
  const { toast } = useToast();
  
  const handleCustomFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setCustomVoiceFiles(prev => [...prev, ...fileList]);
    }
  };
  
  const removeCustomFile = (index: number) => {
    setCustomVoiceFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handlePlayVoice = (voiceId: string) => {
    console.log(`Playing voice preview for ${voiceId}`);
    toast({
      title: "Lecture de la voix",
      description: "Fonctionnalité de prévisualisation à venir",
    });
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      if (selectedTab === 'predefined') {
        if (!selectedVoice) {
          toast({
            title: "Aucune voix sélectionnée",
            description: "Veuillez sélectionner une voix prédéfinie",
            variant: "destructive",
          });
          return;
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log(`Saving predefined voice: ${selectedVoice}`);
        
        toast({
          title: "Voix enregistrée",
          description: "La voix prédéfinie a été configurée avec succès",
        });
      } else {
        // Custom voice validation
        if (!customVoiceName) {
          toast({
            title: "Nom manquant",
            description: "Veuillez fournir un nom pour votre voix personnalisée",
            variant: "destructive",
          });
          return;
        }
        
        if (!customVoiceGender) {
          toast({
            title: "Genre vocal manquant",
            description: "Veuillez sélectionner un genre vocal",
            variant: "destructive",
          });
          return;
        }
        
        if (customVoiceFiles.length === 0) {
          toast({
            title: "Aucun fichier audio",
            description: "Veuillez télécharger des fichiers audio pour l'entraînement",
            variant: "destructive",
          });
          return;
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        console.log("Custom voice data:", {
          name: customVoiceName,
          gender: customVoiceGender,
          files: customVoiceFiles,
        });
        
        toast({
          title: "Voix en cours de traitement",
          description: "Votre voix personnalisée est en cours de création. Nous vous informerons lorsqu'elle sera prête.",
        });
        
        // Reset custom voice form
        setCustomVoiceName('');
        setCustomVoiceGender('');
        setCustomVoiceFiles([]);
      }
    } catch (error) {
      console.error("Voice save error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la voix",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Configuration vocale</h2>
        <p className="text-gray-600">
          Sélectionnez une voix prédéfinie ou créez votre propre voix personnalisée 
          pour votre IA.
        </p>
      </div>
      
      <Tabs 
        defaultValue="predefined" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="predefined">Voix prédéfinies</TabsTrigger>
          <TabsTrigger value="custom">Voix personnalisée</TabsTrigger>
        </TabsList>
        
        <TabsContent value="predefined" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedVoices.map(voice => (
              <VoiceCard
                key={voice.id}
                voice={voice}
                isSelected={selectedVoice === voice.id}
                onSelect={() => setSelectedVoice(voice.id)}
                onPlay={() => handlePlayVoice(voice.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="voice-name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la voix
              </label>
              <Input
                id="voice-name"
                value={customVoiceName}
                onChange={(e) => setCustomVoiceName(e.target.value)}
                placeholder="ex: Voix de l'entreprise"
                disabled={isSaving}
              />
            </div>
            
            <div>
              <label htmlFor="voice-gender" className="block text-sm font-medium text-gray-700 mb-1">
                Genre vocal
              </label>
              <Select
                value={customVoiceGender}
                onValueChange={setCustomVoiceGender}
                disabled={isSaving}
              >
                <SelectTrigger id="voice-gender">
                  <SelectValue placeholder="Sélectionner un genre vocal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculine">Masculin</SelectItem>
                  <SelectItem value="feminine">Féminin</SelectItem>
                  <SelectItem value="neutral">Neutre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Échantillons audio
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <User className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Formats acceptés: .mp3, .wav, .m4a
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Pour de meilleurs résultats, téléchargez au moins 5 minutes d'audio clair
                </p>
                <div className="mt-4">
                  <Input 
                    id="audio-upload"
                    type="file"
                    multiple
                    accept=".mp3,.wav,.m4a"
                    onChange={handleCustomFileChange}
                    disabled={isSaving}
                    className="hidden"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="inline-flex cursor-pointer items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    Sélectionner des fichiers audio
                  </label>
                </div>
              </div>
              
              {customVoiceFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Fichiers sélectionnés ({customVoiceFiles.length})
                  </h3>
                  <ul className="space-y-2">
                    {customVoiceFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md text-sm">
                        <span className="truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomFile(index)}
                          disabled={isSaving}
                        >
                          Retirer
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-brand-600"
          disabled={isSaving}
        >
          {isSaving ? "Enregistrement..." : "Enregistrer la configuration"}
        </Button>
      </div>
    </div>
  );
};

export default VoiceCustomization;
