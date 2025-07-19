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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample admin data
  const adminStats = {
    totalUsers: 2847,
    totalBooks: 15632,
    totalSales: 8945,
    totalRevenue: 2456789,
    pendingApprovals: 23,
    reportedItems: 7
  };

  const recentUsers = [
    {
      id: 1,
      name: 'Rajesh Kumar Sharma',
      email: 'rajesh@example.com',
      joinDate: '2024-01-15',
      status: 'active',
      totalBooks: 12,
      totalSales: 8,
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Priya Kumari Thapa',
      email: 'priya@example.com',
      joinDate: '2024-01-10',
      status: 'active',
      totalBooks: 28,
      totalSales: 15,
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Amit Kumar Gurung',
      email: 'amit@example.com',
      joinDate: '2024-01-08',
      status: 'suspended',
      totalBooks: 7,
      totalSales: 3,
      rating: 3.2,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const pendingBooks = [
    {
      id: 1,
      title: 'Advanced Physics Textbook',
      author: 'Dr. Smith',
      seller: 'Rajesh Kumar',
      price: 1200,
      condition: 'Good',
      category: 'Academic',
      submittedDate: '2024-01-20',
      status: 'pending',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Harry Potter Complete Set',
      author: 'J.K. Rowling',
      seller: 'Priya Thapa',
      price: 2500,
      condition: 'Excellent',
      category: 'Fiction',
      submittedDate: '2024-01-19',
      status: 'pending',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop'
    }
  ];

  const reportedItems = [
    {
      id: 1,
      type: 'book',
      title: 'Suspicious Book Listing',
      reporter: 'User123',
      reason: 'Fake condition description',
      date: '2024-01-18',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'user',
      title: 'Spam Seller Account',
      reporter: 'User456',
      reason: 'Multiple fake listings',
      date: '2024-01-17',
      status: 'resolved'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleApproveBook = (bookId) => {
    console.log('Approving book:', bookId);
    alert('Book approved successfully!');
  };

  const handleRejectBook = (bookId) => {
    console.log('Rejecting book:', bookId);
    alert('Book rejected!');
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user:`, userId);
    alert(`User ${action} successfully!`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{adminStats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Books</p>
              <p className="text-2xl font-bold text-gray-800">{adminStats.totalBooks.toLocaleString()}</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">{adminStats.totalSales.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">Rs. {adminStats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Pending Approvals ({adminStats.pendingApprovals})
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-700">Book Listings</span>
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs">15</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">User Verifications</span>
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">8</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('approvals')}
            className="w-full mt-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all"
          >
            Review Pending Items
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-500" />
            Reported Items ({adminStats.reportedItems})
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-gray-700">Fake Listings</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">4</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm text-gray-700">Spam Users</span>
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">3</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('reports')}
            className="w-full mt-4 bg-gradient-to-r from-red-400 to-red-500 text-white py-2 rounded-lg hover:from-red-500 hover:to-red-600 transition-all"
          >
            Review Reports
          </button>
        </div>
      </div>
    </div>
  );

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