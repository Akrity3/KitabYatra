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

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books/Sales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.totalBooks} / {user.totalSales}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm text-gray-900">{user.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 
                    user.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    onClick={() => handleUserAction(user.id, 'view')}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {user.status === 'active' ? (
                    <button 
                      onClick={() => handleUserAction(user.id, 'suspend')}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleUserAction(user.id, 'activate')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <UserCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => handleUserAction(user.id, 'ban')}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApprovals = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Approvals</h2>
      
      <div className="space-y-6">
        {pendingBooks.map((book) => (
          <div key={book.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <img src={book.image} alt={book.title} className="w-20 h-28 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600">by {book.author}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Seller: {book.seller}</span>
                      <span>Category: {book.category}</span>
                      <span>Condition: {book.condition}</span>
                    </div>
                    <p className="text-xl font-bold text-gray-800 mt-2">Rs. {book.price}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Submitted: {book.submittedDate}</span>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleApproveBook(book.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectBook(book.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reported Items</h2>
      
      <div className="space-y-4">
        {reportedItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">Reported by: {item.reporter}</p>
                <p className="text-gray-600">Reason: {item.reason}</p>
                <p className="text-sm text-gray-500">Date: {item.date}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' : 
                  item.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
                <div className="flex space-x-2 mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Investigate
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    activeTab === 'approvals' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Approvals
                  </div>
                  {adminStats.pendingApprovals > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {adminStats.pendingApprovals}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    activeTab === 'reports' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Reports
                  </div>
                  {adminStats.reportedItems > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {adminStats.reportedItems}
                    </span>
                  )}
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
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'approvals' && renderApprovals()}
            {activeTab === 'reports' && renderReports()}
            {activeTab === 'books' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Management</h2>
                <p className="text-gray-600">Book management functionality will be implemented here.</p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics & Reports</h2>
                <p className="text-gray-600">Analytics dashboard will be implemented here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;