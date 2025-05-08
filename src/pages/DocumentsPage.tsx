
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import DocumentUpload from '@/components/dashboard/documents/DocumentUpload';

const DocumentsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Documents" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <DocumentUpload />
          
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Documents importés</h2>
            
            <div className="text-center py-12">
              <p className="text-gray-500">
                Aucun document importé pour le moment
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Importez des documents pour entraîner votre IA
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentsPage;
