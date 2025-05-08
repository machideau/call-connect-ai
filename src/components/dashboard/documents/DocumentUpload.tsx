
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

const DocumentUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileList]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0 && !websiteUrl) {
      toast({
        title: "Aucun contenu",
        description: "Veuillez ajouter des fichiers ou saisir une URL de site web",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Files to upload:", files);
      console.log("Website URL:", websiteUrl);
      
      toast({
        title: "Import réussi",
        description: `${files.length} fichier(s) et ${websiteUrl ? '1 site web' : '0 site web'} importés avec succès`,
      });
      
      // Reset form
      setFiles([]);
      setWebsiteUrl('');
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Erreur d'importation",
        description: "Une erreur est survenue lors de l'importation des données",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Importer des contenus</h2>
        <p className="text-gray-600">
          Téléchargez des documents ou fournissez des liens vers votre site web pour 
          entraîner votre IA à répondre aux appels avec des informations précises.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Télécharger des documents
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Calendar className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Formats acceptés: .docx, .pdf, .xlsx, .csv, .txt
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Taille maximum: 10MB par fichier
            </p>
            <div className="mt-4">
              <Input 
                id="file-upload"
                type="file"
                multiple
                accept=".docx,.pdf,.xlsx,.csv,.txt"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex cursor-pointer items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Sélectionner des fichiers
              </label>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Fichiers sélectionnés ({files.length})
              </h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md text-sm">
                    <span className="truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      Retirer
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-1">
            URL de site web (optionnel)
          </label>
          <div className="mt-1">
            <Input
              id="website-url"
              type="url"
              placeholder="https://www.votreentreprise.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              disabled={isUploading}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Nous analyserons le contenu de votre site pour enrichir la base de connaissances de l'IA
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-brand-600"
            disabled={isUploading}
          >
            {isUploading ? "Import en cours..." : "Importer"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
