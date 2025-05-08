
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import AssistantConfig from '@/components/dashboard/assistant/AssistantConfig';

const AssistantConfigPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Configuration de l'Assistant" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <AssistantConfig />
        </main>
      </div>
    </div>
  );
};

export default AssistantConfigPage;
