// Admin login 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SharedLoginForm from './components/common/SharedLoginForm';

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = async (data, setError) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Only allows the demo credentials
      if (
        data.email === 'admin@kitabyatra.com' &&
        data.password === 'admin123'
      ) {
        localStorage.setItem('adminToken', 'admin_jwt_token');
        navigate('/admin-dashboard');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      setError('email', { message: 'Invalid admin credentials' });
      setError('password', { message: 'Invalid admin credentials' });
    }
  };

  return (
    <SharedLoginForm
      loginType="admin"
      onSubmit={handleAdminLogin}
      loadingText="Accessing Admin Panel..."
      showDemoInfo
      onClose={() => navigate('/')}
      footer={
        <p className="text-gray-600 text-sm">
          Not an admin?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            User Login
          </button>
        </p>
      }
    />
  );
};

export default AdminLoginPage;
