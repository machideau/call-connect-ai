
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import VoiceCustomization from '@/components/dashboard/voice/VoiceCustomization';

const VoicePage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Configuration Vocale" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <VoiceCustomization />
        </main>
      </div>
    </div>
  );
};

export default VoicePage;
