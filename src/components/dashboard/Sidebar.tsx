
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Home, 
  Mail, 
  Menu,
  Search, 
  Settings, 
  User 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, to, isActive }: SidebarItemProps) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start px-4 py-2 h-auto',
        isActive 
          ? 'bg-brand-100 text-brand-900 hover:bg-brand-200' 
          : 'hover:bg-gray-100 text-gray-700'
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
    </Button>
  </Link>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Tableau de bord', to: '/dashboard' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Documents', to: '/dashboard/documents' },
    { icon: <User className="h-5 w-5" />, label: 'Configuration Vocale', to: '/dashboard/voice' },
    { icon: <Mail className="h-5 w-5" />, label: 'Historique des Appels', to: '/dashboard/calls' },
    { icon: <Search className="h-5 w-5" />, label: 'Conversations', to: '/dashboard/conversations' },
    { icon: <Settings className="h-5 w-5" />, label: 'Paramètres', to: '/dashboard/settings' },
  ];
  
  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300',
        isCollapsed ? 'w-[70px]' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <Link to="/dashboard" className="text-xl font-bold text-brand-600">
            Call<span className="text-teal-600">IA</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-full w-8 h-8"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={isCollapsed ? '' : item.label}
            to={item.to}
            isActive={location.pathname === item.to}
          />
        ))}
      </div>
      
      <div className="p-4 border-t">
        {!isCollapsed && (
          <div className="text-xs text-gray-500">
            <p>Essai gratuit: 2 jours restants</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className="bg-brand-600 h-1.5 rounded-full" 
                style={{ width: '33%' }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
