const PaymentInfo = ({ orderId, vaNumber, qrisUrl, status }) => {
  return (
    <div className="payment-info">
      <div className="info-row">
        <span className="info-label">Order ID:</span>
        <span className="info-value">{orderId}</span>
      </div>
      
      {vaNumber && (
        <div className="info-row">
          <span className="info-label">VA Number:</span>
          <span className="info-value">{vaNumber}</span>
        </div>
      )}
      
      {qrisUrl && (
        <div className="info-row">
          <span className="info-label">QRIS:</span>
          <span className="info-value">Scan to pay</span>
        </div>
      )}
      
      {status && (
        <div className="info-row status-row">
          <span className="info-label">Status:</span>
          {status}
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;