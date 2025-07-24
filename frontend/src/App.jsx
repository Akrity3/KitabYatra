  import React from 'react';
  import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
  import HomePage from './pages/HomePage.jsx';
  import AboutPage from './pages/AboutPage.jsx';
  import BrowsePage from './pages/BrowsePage.jsx';
  import UserLoginPage from './pages/User/UserLoginPage.jsx';
  import SignupPage from './pages/User/SignupPage.jsx';
  import AdminPage from './pages/Admin/AdminPage.jsx';
  import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
  import SellBookForm from './components/user/SellBookForm.jsx';
  import DashboardPage from './pages/User/DashboardPage.jsx';
  import ForgotPasswordPage from './pages/User/ForgotPasswordPage.jsx';
  import { AuthProvider } from './context/AuthContext.jsx';
  import AdminLoginPage from './pages/Admin/AdminLoginPage.jsx';

  function AppRoutes() {
    return (
      <>
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/sell" element={<SellBookForm />} />
        </Routes>
      </>
    );
  }

  function App() {
    return (
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    );
  }

  export default App;