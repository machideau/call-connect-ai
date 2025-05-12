
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import Settings from '@/components/dashboard/settings/Settings';

const SettingsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Paramètres" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Settings />
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
