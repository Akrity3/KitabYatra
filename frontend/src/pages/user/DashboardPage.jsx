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

  // Edit Profile
  const renderEditProfile = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEditProfile}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </button>
        )}
      </div>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-green-800">{successMessage}</span>
          </div>
        </div>
      )}
      {/* Profile Photo Bubble */}
      <div className="flex justify-center mb-6">
        <div className="relative w-28 h-28">
          <img
            src={editForm.avatar || "https://ui-avatars.com/api/?name=User"}
            alt="Profile"
            className="rounded-full w-28 h-28 object-cover border-2 border-gray-200"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-yellow-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-yellow-600 transition">
              <Edit3 className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </label>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={editForm.fullName}
            onChange={e => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50' : ''} ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={editForm.email}
            onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50' : ''} ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={editForm.phone}
            onChange={e => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50' : ''}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={editForm.address}
            onChange={e => setEditForm(prev => ({ ...prev, address: e.target.value }))}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50' : ''}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={editForm.city}
            onChange={e => setEditForm(prev => ({ ...prev, city: e.target.value }))}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50' : ''}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <input
            type="text"
            value={editForm.country}
            onChange={e => setEditForm(prev => ({ ...prev, country: e.target.value }))}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50' : ''}`}
          />
        </div>
      </div>
      {isEditing && (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleSaveProfile}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
  
  // Wishlist section 
  const renderWishlist = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((book) => (
            <WishlistCard
              key={book.id}
              book={book}
              onRemove={removeFromWishlist}
              onView={(book) => {
                alert(`Viewing: ${book.title}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  // Purchases
  const renderPurchases = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Purchases</h2>
      {purchases.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No purchases yet.</div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      )}
    </div>
  );

  // Listings
  const renderListings = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Listings</h2>
      {listings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No books listed yet.</div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );

  // --- ADDED: SALES HISTORY AND SHOPPING CART RENDERERS ---
  const renderSalesHistory = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-blue-400"/> Sales History
      </h2>
      <div className="text-center py-12 text-gray-500">
        No sales history yet. {/* Replace with your SalesHistoryCard, etc. */}
      </div>
    </div>
  );

  const renderShoppingCart = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <ShoppingCart className="w-6 h-6 mr-2 text-green-500"/> Shopping Cart
      </h2>
      <div className="text-center py-12 text-gray-500">
        Your shopping cart is empty. {/* Replace with your ShoppingCartCard, etc. */}
      </div>
    </div>
  );
  // -----

  // Sidebar & Main Layout
  return !user ? (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <img
                  src={user.avatar || "https://ui-avatars.com/api/?name=User"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  {user.city}{user.city && user.country ? ', ' : ''}{user.country}
                </p>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'overview' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('editProfile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'editProfile' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setActiveTab('updatePassword')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'updatePassword' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <Lock className="w-5 h-5 mr-3" />
                  Update Password
                </button>
                <button
                  onClick={() => setActiveTab('sellBook')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'sellBook' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Sell Books
                </button>

                {/* New: Sales History */}
                <button // <-- new
                  onClick={() => setActiveTab('salesHistory')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'salesHistory' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <Clock className="w-5 h-5 mr-3" />
                  Sales History
                </button>
                {/* New: Shopping Cart */}
                <button // <-- new
                  onClick={() => setActiveTab('shoppingCart')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'shoppingCart' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Shopping Cart
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                    activeTab === 'wishlist' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-3" />
                    Wishlist
                  </div>
                  {wishlistItems.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'purchases' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  My Purchases
                </button>
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'listings' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  My Listings
                </button>
              </nav>
            </div>
          </div>
          {/* Main content for each tab */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'editProfile' && renderEditProfile()}
            {activeTab === 'updatePassword' && <UpdatePasswordForm />}
            {activeTab === 'sellBook' && <SellBookForm />}
            {activeTab === 'wishlist' && renderWishlist()}
            {activeTab === 'purchases' && renderPurchases()}
            {activeTab === 'listings' && renderListings()}
            {/* NEW TABS */}
            {activeTab === 'salesHistory' && renderSalesHistory()}
            {activeTab === 'shoppingCart' && renderShoppingCart()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
  
};


export default DashboardPage;
