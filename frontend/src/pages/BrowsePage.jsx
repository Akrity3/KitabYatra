import React, { useState } from 'react';
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import { Search, Filter, Grid, List, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const BrowsePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);

  // Auth context hook
  const { isLoggedIn, login, logout } = useAuth();

  // Book categories and price ranges
  const categories = [
    'All Categories', 'Academic', 'Fiction', 'Non-Fiction', 'Self-Help',
    'Biography', 'Science', 'History', 'Romance', 'Mystery', 'Fantasy', 'Comics', 'Children'
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under Rs. 500' },
    { value: '500-1000', label: 'Rs. 500 - 1000' },
    { value: '1000-2000', label: 'Rs. 1000 - 2000' },
    { value: '2000+', label: 'Above Rs. 2000' }
  ];

  // Book Data (put your real data/fetching here)
  const books = [
    {
      id: 1,
      title: 'Can We Be Strangers Again',
      author: 'Shrijeet Shandilya',
      price: 240,
      originalPrice: 600,
      condition: 'Good',
      image: 'https://i.imgur.com/4nBqfWJ.jpeg?w=250&h=350&fit=crop',
      category: 'Fiction',
      description: 'A contemporary romance novel about second chances and finding love again.'
    },
    {
      id: 2,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      price: 399,
      originalPrice: 640,
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=350&fit=crop',
      category: 'Mystery',
      description: 'A psychological thriller about a woman who refuses to speak after allegedly murdering her husband.'
    },
    {
      id: 3,
      title: 'The Book Thief',
      author: 'Markus Zusak',
      price: 499,
      originalPrice: 880,
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=250&h=350&fit=crop',
      category: 'Fiction',
      description: 'A story about a young girl living in Nazi Germany who steals books and shares them with others.'
    },
    {
      id: 4,
      title: 'Too Good to Be True',
      author: 'Prajakta Koli',
      price: 299,
      originalPrice: 480,
      condition: 'Very Good',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop',
      category: 'Non-Fiction',
      description: 'A memoir about dreams, determination, and the journey to success.'
    },
    {
      id: 5,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 750,
      originalPrice: 1200,
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=250&h=350&fit=crop',
      category: 'Self-Help',
      description: 'Transform your life with the power of small habits and consistent improvement.'
    },
    {
      id: 6,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      price: 650,
      originalPrice: 1100,
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=250&h=350&fit=crop',
      category: 'History',
      description: 'A fascinating journey through human history and the factors that shaped our species.'
    },
    {
      id: 7,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      price: 550,
      originalPrice: 900,
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=250&h=350&fit=crop',
      category: 'Non-Fiction',
      description: 'Understand the psychology behind financial decisions and money management.'
    },
    {
      id: 8,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      price: 400,
      originalPrice: 700,
      condition: 'Fair',
      image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=250&h=350&fit=crop',
      category: 'Self-Help',
      description: 'Learn about financial literacy and the mindset needed to build wealth.'
    }
  ];

  // Filtering logic
  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || book.category.toLowerCase() === selectedCategory.toLowerCase();
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        matchesPrice = book.price >= parseInt(min) && book.price <= parseInt(max);
      } else {
        matchesPrice = book.price >= parseInt(min);
      }
    }
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Demo handlers for wishlist and cart actions
  const handleAddToWishlist = (book) => {
    alert(`Added to wishlist: ${book.title}`);
  };
  const handleAddToCart = (book) => {
    alert(`Added to cart: ${book.title}`);
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  // BookCard component
  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-lg leading-tight">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-3">By {book.author}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">Rs{book.price}.00</span>
            <span className="text-sm text-gray-500 line-through">Rs{book.originalPrice}.00</span>
          </div>
        </div>
        <button
          onClick={() => handleViewDetails(book)}
          className="w-full bg-white border-2 border-gray-800 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-800 hover:text-white transition-colors duration-200 mb-2"
        >
          View Details
        </button>
        {isLoggedIn && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleAddToWishlist(book)}
              className="flex-1 bg-pink-100 text-pink-700 border border-pink-200 py-2 rounded hover:bg-pink-200 transition"
            >
              Wishlist
            </button>
            <button
              onClick={() => handleAddToCart(book)}
              className="flex-1 bg-blue-100 text-blue-700 border border-blue-200 py-2 rounded hover:bg-blue-200 transition"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // BookListItem component
  const BookListItem = ({ book }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex space-x-4">
        <div className="relative">
          <img
            src={book.image}
            alt={book.title}
            className="w-24 h-32 object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{book.title}</h3>
              <p className="text-gray-600 text-sm">By {book.author}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">Rs{book.price}.00</div>
              <div className="text-sm text-gray-500 line-through">Rs{book.originalPrice}.00</div>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">{book.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {book.category}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleViewDetails(book)}
                className="bg-white border-2 border-gray-800 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-800 hover:text-white transition-colors duration-200"
              >
                View Details
              </button>
              {isLoggedIn && (
                <>
                  <button
                    onClick={() => handleAddToWishlist(book)}
                    className="bg-pink-100 text-pink-700 border border-pink-200 px-3 py-2 rounded hover:bg-pink-200 transition"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-2 rounded hover:bg-blue-200 transition"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Browse Books</h1>
          <p className="text-gray-600 mt-2">Discover quality secondhand books at great prices</p>
        </div>
      </header>

      {/* Search and Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category, index) => (
                  <option key={index} value={index === 0 ? 'all' : category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {filteredBooks.length} Books Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Sort by: Featured</span>
            </div>
          </div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </div>
          )}
          {filteredBooks.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or browse all categories</p>
            </div>
          )}
        </div>
      </section>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Book Details</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedBook.title}</h3>
                  <p className="text-gray-600 mb-4">By {selectedBook.author}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-20">Price:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">Rs{selectedBook.price}.00</span>
                        <span className="text-lg text-gray-500 line-through">Rs{selectedBook.originalPrice}.00</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-20">Category:</span>
                      <span className="text-gray-600">{selectedBook.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-20">Condition:</span>
                      <span className="text-gray-600">{selectedBook.condition}</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Description:</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedBook.description}</p>
                  </div>
                  <div className="flex justify-center">
                    <button className="w-full bg-gray-800 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-700 transition-colors duration-200">
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BrowsePage;
