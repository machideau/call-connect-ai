
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  MessageSquare,
  Building2,
  Clock,
  Languages,
  Briefcase,
  VolumeX,
  Volume2
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Définition du schéma de validation pour le formulaire général
const generalFormSchema = z.object({
  assistantName: z.string().min(2, {
    message: "Le nom de l'assistant doit contenir au moins 2 caractères."
  }),
  companyName: z.string().min(2, {
    message: "Le nom de l'entreprise doit contenir au moins 2 caractères."
  }),
  businessDescription: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères."
  }),
  welcomeMessage: z.string().min(10, {
    message: "Le message d'accueil doit contenir au moins 10 caractères."
  }),
  fallbackMessage: z.string().min(10, {
    message: "Le message de repli doit contenir au moins 10 caractères."
  })
});

// Définition du schéma de validation pour les paramètres avancés
const advancedFormSchema = z.object({
  language: z.string().min(1, {
    message: "Veuillez sélectionner une langue."
  }),
  businessHours: z.object({
    enabled: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional()
  }),
  transferOptions: z.object({
    enabled: z.boolean(),
    transferNumber: z.string().optional()
  }),
  conversationTimeout: z.number().min(30, {
    message: "Le délai minimum est de 30 secondes."
  }),
  maxWordCount: z.number().min(50, {
    message: "Le nombre minimum de mots est de 50."
  })
});

// Définition du schéma de validation pour les paramètres vocaux
const voiceFormSchema = z.object({
  voiceType: z.string().min(1, {
    message: "Veuillez sélectionner un type de voix."
  }),
  speakingRate: z.number().min(0.5).max(2),
  pitch: z.number().min(-10).max(10),
  interruptionsAllowed: z.boolean()
});

const AssistantConfig = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  
  // Formulaire général
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      assistantName: "Assistant IA",
      companyName: "",
      businessDescription: "",
      welcomeMessage: "Bonjour, merci d'appeler. Comment puis-je vous aider aujourd'hui ?",
      fallbackMessage: "Je n'ai pas compris votre demande. Pourriez-vous reformuler s'il vous plaît ?"
    }
  });
  
  // Formulaire paramètres avancés
  const advancedForm = useForm<z.infer<typeof advancedFormSchema>>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      language: "fr",
      businessHours: {
        enabled: false,
        startTime: "09:00",
        endTime: "18:00"
      },
      transferOptions: {
        enabled: false,
        transferNumber: ""
      },
      conversationTimeout: 300, // 5 minutes
      maxWordCount: 200
    }
  });
  
  // Formulaire paramètres vocaux
  const voiceForm = useForm<z.infer<typeof voiceFormSchema>>({
    resolver: zodResolver(voiceFormSchema),
    defaultValues: {
      voiceType: "neutral",
      speakingRate: 1.0,
      pitch: 0,
      interruptionsAllowed: true
    }
  });
  
  // Soumission des formulaires
  const onSubmitGeneralForm = (data: z.infer<typeof generalFormSchema>) => {
    console.log("Données générales soumises:", data);
    toast({
      title: "Configuration enregistrée",
      description: "Les paramètres généraux ont été mis à jour avec succès."
    });
  };
  
  const onSubmitAdvancedForm = (data: z.infer<typeof advancedFormSchema>) => {
    console.log("Données avancées soumises:", data);
    toast({
      title: "Configuration enregistrée",
      description: "Les paramètres avancés ont été mis à jour avec succès."
    });
  };
  
  const onSubmitVoiceForm = (data: z.infer<typeof voiceFormSchema>) => {
    console.log("Données vocales soumises:", data);
    toast({
      title: "Configuration enregistrée",
      description: "Les paramètres vocaux ont été mis à jour avec succès."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold mb-4">Configuration de l'Assistant IA</h1>
        <p className="text-gray-600 mb-6">
          Personnalisez votre assistant téléphonique IA pour qu'il reflète parfaitement 
          votre entreprise et réponde efficacement à vos clients.
        </p>
      
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Général</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Avancé</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>Voix</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Onglet Paramètres Généraux */}
          <TabsContent value="general" className="space-y-6">
            <div className="border rounded-md p-4">
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onSubmitGeneralForm)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="assistantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'assistant</FormLabel>
                          <FormControl>
                            <Input placeholder="Assistant IA" {...field} />
                          </FormControl>
                          <FormDescription>
                            Ce nom sera utilisé lors des appels téléphoniques.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'entreprise</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre entreprise" {...field} />
                          </FormControl>
                          <FormDescription>
                            Le nom de votre entreprise tel qu'il sera présenté.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={generalForm.control}
                    name="businessDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description de l'entreprise</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre entreprise, ses services, produits..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Cette description aidera l'IA à comprendre votre entreprise.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="welcomeMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message d'accueil</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Bonjour, merci d'appeler..." 
                            className="min-h-20"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Ce message sera prononcé au début de chaque appel.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="fallbackMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message de secours</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Je n'ai pas compris votre demande..." 
                            className="min-h-20"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Ce message sera utilisé si l'IA ne comprend pas la demande.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-brand-600">Enregistrer</Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
          
          {/* Onglet Paramètres Avancés */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="border rounded-md p-4">
              <Form {...advancedForm}>
                <form onSubmit={advancedForm.handleSubmit(onSubmitAdvancedForm)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={advancedForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Langue principale</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une langue" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="en">Anglais</SelectItem>
                                <SelectItem value="es">Espagnol</SelectItem>
                                <SelectItem value="de">Allemand</SelectItem>
                                <SelectItem value="it">Italien</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            La langue principale utilisée par l'assistant.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={advancedForm.control}
                      name="conversationTimeout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Délai d'inactivité (secondes)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={30}
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Délai après lequel l'assistant termine l'appel sans réponse.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <h3 className="font-medium">Heures d'ouverture</h3>
                      </div>
                      <FormField
                        control={advancedForm.control}
                        name="businessHours.enabled"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {advancedForm.watch("businessHours.enabled") && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={advancedForm.control}
                          name="businessHours.startTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Heure de début</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={advancedForm.control}
                          name="businessHours.endTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Heure de fin</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-gray-500" />
                        <h3 className="font-medium">Transfert d'appel</h3>
                      </div>
                      <FormField
                        control={advancedForm.control}
                        name="transferOptions.enabled"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {advancedForm.watch("transferOptions.enabled") && (
                      <div className="mt-4">
                        <FormField
                          control={advancedForm.control}
                          name="transferOptions.transferNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Numéro de transfert</FormLabel>
                              <FormControl>
                                <Input placeholder="+33612345678" {...field} />
                              </FormControl>
                              <FormDescription>
                                L'appel sera transféré à ce numéro si nécessaire.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  
                  <FormField
                    control={advancedForm.control}
                    name="maxWordCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longueur maximale des réponses (mots)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={50}
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Limite le nombre de mots dans les réponses de l'assistant.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-brand-600">Enregistrer</Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
          
          {/* Onglet Paramètres Vocaux */}
          <TabsContent value="voice" className="space-y-6">
            <div className="border rounded-md p-4">
              <Form {...voiceForm}>
                <form onSubmit={voiceForm.handleSubmit(onSubmitVoiceForm)} className="space-y-4">
                  <FormField
                    control={voiceForm.control}
                    name="voiceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de voix</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type de voix" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="masculine">Masculine</SelectItem>
                              <SelectItem value="feminine">Féminine</SelectItem>
                              <SelectItem value="neutral">Neutre</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Le type de voix utilisé par votre assistant IA.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={voiceForm.control}
                      name="speakingRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vitesse d'élocution ({field.value}x)</FormLabel>
                          <FormControl>
                            <Input 
                              type="range" 
                              min={0.5} 
                              max={2} 
                              step={0.1}
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="w-full"
                            />
                          </FormControl>
                          <FormDescription>
                            Ajustez la vitesse à laquelle l'assistant parle.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={voiceForm.control}
                      name="pitch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tonalité ({field.value})</FormLabel>
                          <FormControl>
                            <Input 
                              type="range" 
                              min={-10} 
                              max={10} 
                              step={1}
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="w-full"
                            />
                          </FormControl>
                          <FormDescription>
                            Ajustez la hauteur de la voix de l'assistant.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <VolumeX className="w-5 h-5 text-gray-500" />
                          <h3 className="font-medium">Interruptions</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          Permettre aux appelants d'interrompre l'assistant pendant qu'il parle
                        </p>
                      </div>
                      <FormField
                        control={voiceForm.control}
                        name="interruptionsAllowed"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2">Prévisualisation de la voix</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Écoutez un exemple de votre configuration vocale actuelle.
                    </p>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Fonctionnalité à venir",
                          description: "La prévisualisation audio sera disponible prochainement."
                        })
                      }}
                    >
                      Écouter l'exemple
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-brand-600">Enregistrer</Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssistantConfig;
