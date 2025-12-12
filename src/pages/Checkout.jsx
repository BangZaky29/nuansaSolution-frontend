import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import SelectMethod from '../components/SelectMethod';
import PaymentInfo from '../components/PaymentInfo';
import StatusBadge from '../components/StatusBadge';
import '../styles/Checkout.css';
// import axios from 'axios'; // Uncomment when ready to integrate

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPackage = location.state?.selectedPackage;

  const [paymentMethod, setPaymentMethod] = useState('va_bca');
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPackageDetails, setShowPackageDetails] = useState(false);

  // Redirect if no package selected
  useEffect(() => {
    if (!selectedPackage) {
      navigate('/packages');
    }
  }, [selectedPackage, navigate]);

  // Calculate fees and total
  const calculatePayment = () => {
    if (!selectedPackage) return null;

    const baseAmount = selectedPackage.price;
    
    // Biaya layanan berdasarkan metode pembayaran
    let serviceFee = 0;
    if (paymentMethod === 'va_bca') {
      serviceFee = 4000; // Rp 4.000
    } else if (paymentMethod === 'qris') {
      serviceFee = baseAmount * 0.007; // 0.7%
    }
    
    // Total pembayaran
    const totalAmount = baseAmount + serviceFee;

    return {
      baseAmount,
      serviceFee,
      totalAmount
    };
  };

  const payment = calculatePayment();

  // Handle payment creation
  const handlePay = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/payment/create', {
      //   amount: payment.totalAmount,
      //   payment_method: paymentMethod,
      //   package_name: selectedPackage.name
      // });
      
      // Simulate API response
      setTimeout(() => {
        const mockResponse = {
          order_id: 'ORD-' + Date.now(),
          va_number: paymentMethod === 'va_bca' ? '8277' + Math.floor(Math.random() * 1000000000) : null,
          qris_url: paymentMethod === 'qris' ? 'https://qris.example.com/' + Date.now() : null,
          status: 'pending'
        };

        setPaymentInfo(mockResponse);
        setStatus('pending');
        setLoading(false);
        
        // Start polling for status
        startStatusPolling(mockResponse.order_id);
      }, 1500);
      
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      alert('Payment failed. Please try again.');
    }
  };

  // Poll payment status
  const startStatusPolling = (orderId) => {
    const pollInterval = setInterval(async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await axios.get(`/api/payment/status/${orderId}`);
        // const newStatus = response.data.status;
        
        // Simulate status change (for demo)
        setTimeout(() => {
          const statuses = ['pending', 'paid', 'failed', 'expired'];
          const randomStatus = statuses[Math.floor(Math.random() * 2) + 1]; // paid or failed
          setStatus(randomStatus);
          
          if (randomStatus !== 'pending') {
            clearInterval(pollInterval);
          }
        }, 5000);
        
      } catch (error) {
        console.error('Status polling error:', error);
        clearInterval(pollInterval);
      }
    }, 3000); // Poll every 3 seconds

    // Clean up on unmount
    return () => clearInterval(pollInterval);
  };

  if (!selectedPackage) {
    return null;
  }

  return (
    <div className="checkout-page">
      <Header />
      <main className="checkout-main">
        <div className="checkout-container">
          <div className="checkout-card">
            <h2 className="checkout-title">Complete Your Purchase</h2>
            
            {/* Package Info */}
            <div className="package-info-box">
              <div className="package-detail">
                <span className="package-label">Package:</span>
                <span className="package-name">{selectedPackage.name}</span>
              </div>
              <div className="package-price">
                Rp {selectedPackage.price.toLocaleString('id-ID')}
              </div>
              
              {/* Expandable Package Benefits */}
              {showPackageDetails && (
                <div className="package-benefits-expanded">
                  <div className="benefits-title">Package Benefits:</div>
                  <ul className="benefits-list-checkout">
                    {selectedPackage.benefits.map((benefit, idx) => (
                      <li key={idx} className="benefit-item-checkout">
                        <span className="check-icon-checkout">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* See More Button */}
              <button 
                className="see-more-btn"
                onClick={() => setShowPackageDetails(!showPackageDetails)}
              >
                {showPackageDetails ? 'See Less' : 'See More'}
                <span className={`arrow-icon ${showPackageDetails ? 'rotate' : ''}`}>
                  ▼
                </span>
              </button>
            </div>

            {/* Payment Form */}
            <div className="checkout-form">
              {/* Amount Breakdown */}
              <div className="amount-breakdown">
                <div className="breakdown-row">
                  <span className="breakdown-label">Harga Paket</span>
                  <span className="breakdown-value">
                    Rp {payment.baseAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <SelectMethod
                value={paymentMethod}
                onChange={setPaymentMethod}
                disabled={!!paymentInfo}
              />

              {/* Service Fee Display */}
              <div className="fee-section">
                <div className="fee-row">
                  <span className="fee-label">
                    Biaya Layanan ({paymentMethod === 'va_bca' ? 'BCA' : 'QRIS'})
                  </span>
                  <span className="fee-value">
                    Rp {Math.round(payment.serviceFee).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="total-amount-section">
                <div className="total-row">
                  <span className="total-label">Total Pembayaran</span>
                  <span className="total-value">
                    Rp {Math.round(payment.totalAmount).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                className="pay-button"
                onClick={handlePay}
                disabled={loading || !!paymentInfo}
              >
                {loading ? 'Processing...' : paymentInfo ? 'Payment Created' : 'Pay Now'}
              </button>
            </div>

            {/* Payment Information */}
            {paymentInfo && (
              <PaymentInfo
                orderId={paymentInfo.order_id}
                vaNumber={paymentInfo.va_number}
                qrisUrl={paymentInfo.qris_url}
                status={<StatusBadge status={status} />}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
