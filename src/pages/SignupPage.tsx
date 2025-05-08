
import Navbar from '@/components/layout/Navbar';
import SignupForm from '@/components/auth/SignupForm';
import Footer from '@/components/layout/Footer';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container">
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
