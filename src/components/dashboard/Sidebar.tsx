
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
  User,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, to, isActive, isCollapsed }: SidebarItemProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={to} className="block">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start px-4 py-2 h-auto transition-colors duration-200',
              isActive 
                ? 'bg-brand-100 text-brand-900 hover:bg-brand-200 dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
              {icon}
              {!isCollapsed && <span>{label}</span>}
            </div>
          </Button>
        </Link>
      </TooltipTrigger>
      {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Tableau de bord', to: '/dashboard' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Documents', to: '/dashboard/documents' },
    { icon: <User className="h-5 w-5" />, label: 'Configuration Vocale', to: '/dashboard/voice' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Configuration Assistant', to: '/dashboard/assistant' },
    { icon: <Mail className="h-5 w-5" />, label: 'Historique des Appels', to: '/dashboard/calls' },
    { icon: <Search className="h-5 w-5" />, label: 'Conversations', to: '/dashboard/conversations' },
    { icon: <Settings className="h-5 w-5" />, label: 'Paramètres', to: '/dashboard/settings' },
  ];
  
  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-background dark:bg-sidebar-background border-r border-border transition-all duration-300',
        isCollapsed ? 'w-[70px]' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <Link to="/dashboard" className="text-xl font-bold text-brand-600 dark:text-brand-400">
            Call<span className="text-teal-600 dark:text-teal-400">IA</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-full w-8 h-8"
          aria-label={isCollapsed ? "Étendre le menu" : "Réduire le menu"}
        >
          <ChevronRight className={cn("h-5 w-5 transition-transform", isCollapsed ? "rotate-0" : "rotate-180")} />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isActive={location.pathname === item.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground">
            <p>Essai gratuit: 2 jours restants</p>
            <div className="w-full bg-muted rounded-full h-1.5 mt-1">
              <div 
                className="bg-brand-600 dark:bg-brand-500 h-1.5 rounded-full" 
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
