import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Settings, LogOut, Upload } from 'lucide-react';
import FileUpload from '../common/FileUpload';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showUpload, setShowUpload] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'CFO':
        return 'bg-red-100 text-red-800';
      case 'Finance Analyst':
        return 'bg-blue-100 text-blue-800';
      case 'Project Manager':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className={`text-xs px-2 py-1 rounded-full ${getRoleColor(user?.role || '')}`}>
                {user?.role}
              </div>
            </div>
            <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <div className="flex space-x-1">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUpload && (
        <FileUpload
          onClose={() => setShowUpload(false)}
          onUpload={(file) => {
            console.log('Uploaded:', file);
            setShowUpload(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;