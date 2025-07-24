import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Menu, X, Settings, Bell, ShoppingCart, User, LogOut 
        } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      setUser(JSON.parse(userData));
      // Load cart items from localStorage
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    setUser(null);
    setCartItems([]);
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0" onClick={handleNavClick}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white">KitabYatra</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth/Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/cart')}
                  className="relative text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <Bell className="w-6 h-6" />
                </button>
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-600 hover:border-yellow-400 transition-colors"
                    />
                    <span className="font-medium">{user.fullName.split(' ')[0]}</span>
                  </button>
                  {isProfileOpen && (
                    <ProfileDropdown
                      user={user}
                      cartItems={cartItems}
                      onAction={() => {}}
                      onClose={() => setIsProfileOpen(false)}
                    />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm border-t border-gray-800">
              <Link
                to="/"
                onClick={handleNavClick}
                className="block px-3 py-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors rounded-lg hover:bg-gray-800"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={handleNavClick}
                className="block px-3 py-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors rounded-lg hover:bg-gray-800"
              >
                About
              </Link>
              <div className="border-t border-gray-800 pt-3 mt-3">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white">{user.fullName}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-gray-800 mt-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors rounded-lg hover:bg-gray-800"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleNavClick}
                      className="block px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg mt-2"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
