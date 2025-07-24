import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/user/HomePage';
import UserLoginPage from './pages/user/UserLoginPage.jsx';
import SignupPage from './pages/user/SignupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/admin-login" element={<AdminLoginPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;