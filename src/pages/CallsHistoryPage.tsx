
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import CallsHistory from '@/components/dashboard/calls/CallsHistory';

const CallsHistoryPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Historique des Appels" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <CallsHistory />
        </main>
      </div>
    </div>
  );
};

export default CallsHistoryPage;
