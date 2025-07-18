import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection.jsx';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;