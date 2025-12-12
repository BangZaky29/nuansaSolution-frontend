import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import '../styles/Packages.css';

const Packages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: 'Silver',
      price: 500000,
      benefits: [
        'Basic legal consultation',
        'Document review (up to 5)',
        'Email support',
        '30-day access',
      ],
    },
    {
      id: 2,
      name: 'Gold',
      price: 1000000,
      benefits: [
        'Priority legal consultation',
        'Unlimited document review',
        'Phone & email support',
        '90-day access',
        'Contract templates',
      ],
    },
    {
      id: 3,
      name: 'Premium',
      price: 2000000,
      benefits: [
        'VIP legal consultation',
        'Unlimited document review',
        '24/7 support',
        '1-year access',
        'Contract templates',
        'Dedicated legal advisor',
      ],
    },
  ];

  const handleSelectPackage = (pkg) => {
    // Navigate to checkout with selected package data
    navigate('/checkout', { state: { selectedPackage: pkg } });
  };

  return (
    <div className="packages-page">
      <Header />
      <main className="packages-main">
        <div className="packages-container">
          <h1 className="packages-title">Choose Your Package</h1>
          <div className="packages-grid">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onSelect={handleSelectPackage}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Packages;