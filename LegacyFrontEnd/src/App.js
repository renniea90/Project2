import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/Admin';
import { CartProvider } from './components/CartContext'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
