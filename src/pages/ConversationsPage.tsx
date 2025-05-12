
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ConversationsList from '@/components/dashboard/conversations/ConversationsList';

const ConversationsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Conversations" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <ConversationsList />
        </main>
      </div>
    </div>
  );
};

export default ConversationsPage;
