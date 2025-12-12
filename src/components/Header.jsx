import { Link } from 'react-router-dom';
import '../styles/Header.css';

// ✅ import logo dari assets
import Logo from '../assets/NS_blank_02.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img
              src={Logo}
              alt="Nuansa Solution"
              className="logo-image"
            />
          </Link>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/packages" className="nav-link">Packages</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
