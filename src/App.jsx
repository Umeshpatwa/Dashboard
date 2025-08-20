import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

// Import page components
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/services/Services';
import Products from './pages/products/Products';
import Customers from './pages/customers/Customers';
import Inventory from './pages/inventory/Inventory';
import Reports from './pages/reports/Reports';

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <Routes>
            {/* Default Route -> Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Services & Products */}
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            
            {/* Customers */}
            <Route path="/customers" element={<Customers />} />
            
            {/* Inventory */}
            <Route path="/inventory" element={<Inventory />} />
            
            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
            
            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Fallback (404) */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}
