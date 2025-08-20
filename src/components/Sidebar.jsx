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
  { 
    icon: Package, 
    label: 'Services & Products', 
    path: '/services-products',
    subItems: [
      { label: 'All Services', path: '/services' },
      { label: 'All Products', path: '/products' },
      { label: 'Categories', path: '/categories' }
    ]
  },
  { 
    icon: Users, 
    label: 'Customers', 
    path: '/customers',
    subItems: [
      { label: 'All Customers', path: '/customers' },
      { label: 'Customer Groups', path: '/customer-groups' }
    ]
  },
  { 
    icon: Layers, 
    label: 'Inventory', 
    path: '/inventory',
    subItems: [
      { label: 'Stock Levels', path: '/inventory/stock' },
      { label: 'Suppliers', path: '/inventory/suppliers' },
      { label: 'Purchase Orders', path: '/inventory/orders' }
    ]
  },
  { 
    icon: BarChart2, 
    label: 'Reports', 
    path: '/reports',
    subItems: [
      { label: 'Sales Reports', path: '/reports/sales' },
      { label: 'Inventory Reports', path: '/reports/inventory' },
      { label: 'Customer Reports', path: '/reports/customers' }
    ]
  },
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
              <li 
                key={item.path} 
                className={`${location.pathname === item.path || (item.subItems && item.subItems.some(subItem => location.pathname.startsWith(subItem.path))) ? 'active' : ''} ${item.subItems ? 'has-submenu' : ''}`}
              >
                <Link to={item.path} className="nav-link">
                  <item.icon size={20} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {item.subItems && (
                    <ChevronRight size={16} className="nav-arrow submenu-toggle" />
                  )}
                </Link>
                {item.subItems && (
                  <ul className="submenu">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path} className={location.pathname === subItem.path ? 'active' : ''}>
                        <Link to={subItem.path}>
                          <span className="submenu-label">{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
