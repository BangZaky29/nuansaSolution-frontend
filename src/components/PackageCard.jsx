import { useState } from 'react';

const PackageCard = ({ package: pkg, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`package-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(pkg)}
    >
      <div className="package-header">
        <h3 className="package-name">{pkg.name}</h3>
        <div className="package-price">
          Rp {pkg.price.toLocaleString('id-ID')}
        </div>
      </div>
      
      <ul className="benefits-list">
        {pkg.benefits.map((benefit, idx) => (
          <li key={idx} className="benefit-item">
            <span className="check-icon">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      
      <button className="select-button">
        Select Package
      </button>
    </div>
  );
};

export default PackageCard;