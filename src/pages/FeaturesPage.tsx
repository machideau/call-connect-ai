
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeatureDetails from '@/components/features/FeatureDetails';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <FeatureDetails />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
