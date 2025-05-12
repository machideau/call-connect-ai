
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to settings page with notifications tab selected
    navigate('/dashboard/settings?tab=notifications');
  }, [navigate]);
  
  return null; // This component just redirects
};

export default NotificationsPage;
