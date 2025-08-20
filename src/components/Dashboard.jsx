import { useState, useEffect } from 'react';
import { 
  Users, 
  Package,
  Layers,
  AlertCircle,
  BarChart2,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Download,
  RefreshCw,
  Calendar,
  Filter
} from 'lucide-react';
import ChartComponent from './ChartComponent';
import Sidebar from './Sidebar';
import StatCard from './StatCard';
import BackendTest from './BackendTest';
import './Dashboard.css';
import './Sidebar.css';
import './StatCard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const stats = [
    {
      title: 'Total Products',
      value: '2,420',
      change: '12%',
      changeType: 'increase',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Total Categories',
      value: '24',
      change: '4%',
      changeType: 'decrease',
      icon: Layers,
      color: 'green'
    },
    {
      title: 'Total Customers',
      value: '1,521',
      change: '8%',
      changeType: 'increase',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Alerts',
      value: '12',
      change: '2%',
      changeType: 'decrease',
      icon: AlertCircle,
      color: 'orange'
    }
  ];

  // Chart data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 4000, 3500, 4500, 5000, 4800, 5200],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        type: 'line'
      },
      {
        label: 'Orders',
        data: [2000, 2500, 3000, 3500, 4000, 4200, 4500],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        type: 'line'
      }
    ]
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Desktop',
        data: [320, 280, 400, 350, 420, 380],
        backgroundColor: '#4f46e5',
        type: 'bar'
      },
      {
        label: 'Mobile',
        data: [180, 200, 220, 250, 280, 300],
        backgroundColor: '#10b981',
        type: 'bar'
      }
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`main-content ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <header className="topbar">
          <div className="topbar-left">
            <button 
              className="sidebar-toggle-btn" 
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search..." className="search-input" />
            </div>
          </div>
          
          <div className="topbar-right">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <span className="user-name">Admin</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="content-header">
            <h1 className="page-title">Dashboard</h1>
            <div className="header-actions">
              <div className="date-range-picker">
                <Calendar size={16} />
                <span>This Month</span>
                <ChevronDown size={16} />
              </div>
              <button className="btn btn-primary">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Revenue Overview</h3>
                <div className="chart-actions">
                  <button className="icon-btn">
                    <Filter size={16} />
                  </button>
                  <button className="icon-btn">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="chart-wrapper">
                <ChartComponent type="line" data={lineChartData} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Sales by Device</h3>
                <div className="chart-actions">
                  <button className="icon-btn">
                    <Filter size={16} />
                  </button>
                  <button className="icon-btn">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="chart-wrapper">
                <ChartComponent type="bar" data={barChartData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Backend Connection Test Section */}
      <div className="dashboard-section">
        <h2>Backend Connection</h2>
        <BackendTest />
      </div>
    </div>
  );
};

export default Dashboard;
