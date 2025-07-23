import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, X, Shield } from 'lucide-react';

const AdminPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Predefined admin credentials (in real app, this would be server-side)
  const adminCredentials = {
    email: 'admin@kitabyatra.com',
    password: 'admin123'
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Check admin credentials
      if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
        console.log('Admin login successful:', formData);
        alert('Admin login successful! Welcome to the admin dashboard.');
        navigate('/admin-dashboard'); // You can create this route later
      } else {
        setErrors({ 
          email: 'Invalid admin credentials',
          password: 'Invalid admin credentials'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold">Admin Access</h2>
          </div>
          <p className="text-red-100">Restricted area - Authorized personnel only</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter admin email"
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Access Admin Panel
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Not an admin?{' '}
              <Link 
                to="/login"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Regular Login
              </Link>
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-medium mb-1">Demo Credentials:</p>
              <p className="text-xs text-gray-500">Email: admin@kitabyatra.com</p>
              <p className="text-xs text-gray-500">Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;