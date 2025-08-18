import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Users, 
  AlertCircle, 
  BarChart2, 
  Settings,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Layers, label: 'Categories', path: '/categories' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: AlertCircle, label: 'Inventory', path: '/inventory' },
  { icon: BarChart2, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">D</div>
          <span>Dashboard</span>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">MAIN MENU</div>
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>
                  <item.icon size={20} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  <ChevronRight size={16} className="nav-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <div className="upgrade-banner">
          <div className="upgrade-icon">🚀</div>
          <div className="upgrade-text">
            <div className="upgrade-title">Upgrade to PRO</div>
            <div className="upgrade-desc">Get access to all features</div>
          </div>
        </div>
      </div>
    </div>
  );
}
