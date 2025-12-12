const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'paid':
        return 'status-badge status-paid';
      case 'failed':
        return 'status-badge status-failed';
      case 'expired':
        return 'status-badge status-expired';
      default:
        return 'status-badge status-pending';
    }
  };

  return (
    <span className={getStatusClass()}>
      {status || 'pending'}
    </span>
  );
};

export default StatusBadge;