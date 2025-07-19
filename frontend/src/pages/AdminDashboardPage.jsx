import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, Package, DollarSign, TrendingUp, Eye, 
  Search, Filter, Edit, Trash2, CheckCircle, XCircle, 
  AlertTriangle, BarChart3, PieChart, Calendar, Download,
  UserCheck, UserX, Ban, Shield, Settings, LogOut, Bell,
  Star, MapPin, Clock, Phone, Mail
} from 'lucide-react';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Go to Homepage</span>
              </button>
              <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              
              <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                    activeTab === 'overview' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Overview
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                    activeTab === 'users' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Users
                </button>

                <button
                  onClick={() => setActiveTab('books')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                    activeTab === 'books' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Books
                </button>

                <button
                  onClick={() => setActiveTab('approvals')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                    activeTab === 'approvals' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approvals
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                    activeTab === 'reports' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Reports
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                    activeTab === 'analytics' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <PieChart className="w-5 h-5 mr-2" />
                  Analytics
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Admin Dashboard</h2>
              <p className="text-gray-600">Select a tab from the sidebar to get started.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;