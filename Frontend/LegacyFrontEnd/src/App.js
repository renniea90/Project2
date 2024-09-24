import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/Admin';
import { CartProvider } from './components/CartContext'; 
import LoginPage from './pages/Login';
import useStore from './store/store';

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
