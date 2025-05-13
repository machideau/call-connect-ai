
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import DashboardStats from '@/components/dashboard/stats/DashboardStats';

const DashboardPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Tableau de bord" />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Statistiques et graphiques */}
          <DashboardStats />
          
          {/* Guide d'onboarding */}
          {showOnboarding && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Bienvenue sur CallIA!</h2>
                <button 
                  onClick={() => setShowOnboarding(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Suivez ces étapes pour configurer votre centre d'appels IA:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-md">
                  <div className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Importer des documents</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Téléchargez des fichiers et ajoutez des liens vers votre site web pour 
                      créer la base de connaissances de votre IA
                    </p>
                    <div className="mt-3">
                      <a 
                        href="/dashboard/documents" 
                        className="text-sm font-medium text-brand-600 hover:text-brand-800"
                      >
                        Gérer les documents →
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-md">
                  <div className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Configurer la voix de l'IA</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Choisissez une voix prédéfinie ou créez votre propre voix personnalisée
                    </p>
                    <div className="mt-3">
                      <a 
                        href="/dashboard/voice" 
                        className="text-sm font-medium text-brand-600 hover:text-brand-800"
                      >
                        Configurer la voix →
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-md">
                  <div className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Définir le numéro de téléphone</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Configurez le numéro de téléphone qui sera utilisé par votre IA
                    </p>
                    <div className="mt-3">
                      <a 
                        href="/dashboard/settings" 
                        className="text-sm font-medium text-brand-600 hover:text-brand-800"
                      >
                        Paramètres du numéro →
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border border-dashed rounded-md">
                  <div className="rounded-full h-6 w-6 bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Activer le service</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Une fois la configuration terminée, activez votre IA pour 
                      commencer à gérer les appels
                    </p>
                    <div className="mt-3">
                      <button 
                        className="bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-md px-4 py-2 text-sm font-medium"
                        disabled
                      >
                        Configuration incomplète
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
