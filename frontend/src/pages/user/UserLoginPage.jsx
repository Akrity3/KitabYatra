// UserLoginPage
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SharedLoginForm from '../../../components/common/SharedLoginForm';



const UserLoginPage = () => {
  const navigate = useNavigate();

  const handleUserLogin = async (data, setError) => {
    try {
        // Logic, localstorage,useAuth().login()
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Always passes for demo, implement real login logic as needed.
      localStorage.setItem('user', JSON.stringify({
        fullName: 'Aakriti Rasaili',
        email: data.email,
        avatar: 'https://i.imgur.com/VeKz25x.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }));
      localStorage.setItem('token', 'mock_jwt_token');
      navigate('/browse');
    } catch (error) {
      setError('email', { message: 'Invalid credentials' });
      setError('password', { message: 'Invalid credentials' });
    }
  };

  return (
    <SharedLoginForm
      loginType="user"
      onSubmit={handleUserLogin}
      loadingText="Signing In..."
      onClose={() => navigate('/')}
      footer={
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
          >
            Sign up
          </button>
          <br />
          <span className="text-sm">
            Want admin login?{' '}
            <button
              onClick={() => navigate('/admin-login')}
              className="text-red-700 hover:text-red-800 font-semibold"
            >
              Admin Login
            </button>
          </span>
        </p>
      }
    />
  );
};

export default UserLoginPage;
