import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Importing UI components
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import SellBookForm from './SellBookForm.jsx';
import WishlistCard from './WishlistCard.jsx';
import PurchaseCard from './PurchaseCard.jsx';
import ListingCard from './ListingCard.jsx';
import UpdatePasswordForm from './UpdatePasswordForm.jsx';

// Icon imports (Lucide)
import { 
  User, Edit3, Lock, Package, Heart, ShoppingBag, 
  Eye, Settings, BookOpen, TrendingUp, Star, 
  Save, Camera, Mail, Phone, MapPin, Calendar,
  AlertCircle, CheckCircle, X, 
  ShoppingCart, Clock // <-- new
} from 'lucide-react';


/**
 * DashboardPage displays the user's dashboard
 * Features: overview, profile editing, wishlist, purchases, listings, settings, etc.
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Core state variables
  const [activeTab, setActiveTab] = useState('overview');        // Currently selected dashboard tab
  const [user, setUser] = useState(null);                        // User profile object
  const [isEditing, setIsEditing] = useState(false);             // Whether profile is being edited

  // App features' data
  const [wishlistItems, setWishlistItems] = useState([]);        // Wishlist books
  const [purchases, setPurchases] = useState([]);                // Purchase records
  const [listings, setListings] = useState([]);                  // User's sale listings

  // Profile edit form (use avatar)
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    avatar: null
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // On mount: check auth, get user, wishlist, others
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!userData || !token) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setEditForm({
      fullName: parsedUser.fullName || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || '',
      city: parsedUser.city || '',
      country: parsedUser.country || '',
      avatar: parsedUser.avatar || null
    });
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
    loadMockData();
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
  }, [navigate, location]);

  const loadMockData = () => {
    setPurchases([
      {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        price: 450,
        purchaseDate: '2024-01-15',
        status: 'delivered',
        image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop'
      }
    ]);
    setListings([
      {
        id: 1,
        title: 'Advanced Physics',
        author: 'Dr. Smith',
        price: 1200,
        status: 'active',
        postedDate: '2024-01-10',
        image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop'
      }
    ]);
  };

  // --- PROFILE IMAGE HANDLER ---
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditForm(prev => ({ ...prev, avatar: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- PROFILE EDIT HANDLERS ---
  const handleEditProfile = () => setIsEditing(true);
  const handleSaveProfile = () => {
    const newErrors = {};
    if (!editForm.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!editForm.email.trim()) newErrors.email = 'Email is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Persist avatar to user object for display everywhere!
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Wishlist remove handler
  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== bookId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // --- SECTION RENDERERS ---

  // Overview
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Wishlist Items</p>
              <p className="text-2xl font-bold text-gray-800">{wishlistItems.length}</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-800">{purchases.length}</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Books Listed</p>
              <p className="text-2xl font-bold text-gray-800">{listings.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-medium text-gray-800">Book purchased successfully</p>
              <p className="text-sm text-gray-600">The Alchemist - 2 days ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Heart className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-medium text-gray-800">Added to wishlist</p>
              <p className="text-sm text-gray-600">Atomic Habits - 3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};


export default DashboardPage;
