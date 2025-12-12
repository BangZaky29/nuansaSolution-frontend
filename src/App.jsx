import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Packages from './pages/Packages';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/packages" replace />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;