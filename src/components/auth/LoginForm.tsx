
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Check for demo credentials
      if (email === 'admin@admin.com' && password === '1234') {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        
        // Navigate to dashboard
        navigate('/dashboard/assistant');
        return;
      }
      
      // Handle other login attempts (mock for now)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur s'est produite lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-sm border">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Connexion</h1>
        <p className="text-gray-600">Accédez à votre tableau de bord CallIA</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            disabled={isLoading}
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-800">
              Mot de passe oublié?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-brand-600" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou</span>
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={() => console.log("Google login")}
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuer avec Google
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Nouveau sur CallIA?{" "}
          <Link to="/signup" className="text-brand-600 hover:text-brand-800 font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
      
      {/* Debug info - can be removed in production */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p className="text-center">Pour la démo: admin@admin.com / 1234</p>
      </div>
    </div>
  );
};

export default LoginForm;
