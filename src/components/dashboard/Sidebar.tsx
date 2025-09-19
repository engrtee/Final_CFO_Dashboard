import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Building2, 
  TrendingUp, 
  FolderOpen, 
  PieChart, 
  Droplets, 
  Shield, 
  FileText, 
  Download 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    {
      to: '/dashboard',
      icon: TrendingUp,
      label: 'Overview',
      color: 'text-blue-600',
      end: true
    },
    {
      to: '/dashboard/performance',
      icon: TrendingUp,
      label: 'Performance Management',
      color: 'text-blue-600'
    },
    {
      to: '/dashboard/projects',
      icon: FolderOpen,
      label: 'Project Management',
      color: 'text-purple-600'
    },
    {
      to: '/dashboard/budgeting',
      icon: PieChart,
      label: 'Budgeting & Forecasting',
      color: 'text-green-600'
    },
    {
      to: '/dashboard/liquidity',
      icon: Droplets,
      label: 'Liquidity & Solvency',
      color: 'text-cyan-600'
    },
    {
      to: '/dashboard/risk',
      icon: Shield,
      label: 'Risk & Compliance',
      color: 'text-red-600'
    },
    {
      to: '/dashboard/reporting',
      icon: FileText,
      label: 'Financial Reporting & Analysis',
      color: 'text-orange-600'
    },
    {
      to: '/dashboard/downloads',
      icon: Download,
      label: 'Download Center',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Zenith Bank</h1>
            <p className="text-sm text-gray-500">CFO Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-red-50 text-red-700 border-r-2 border-red-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;