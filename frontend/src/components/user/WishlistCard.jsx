import React from 'react';
import PropTypes from 'prop-types';
import { Star, MapPin, Clock, X, ShoppingCart } from 'lucide-react';

/**
 * WishlistCard
 * -------------
 * Props:
 * - book: Book object to display (required)
 * - onRemove: function(bookId) to remove from wishlist (required)
 * - onView: function(book) to view book details (optional)
 * - onAddToCart: function(book) to show toast or custom cart notification (optional)
 */
const WishlistCard = ({ book, onRemove, onView, onAddToCart }) => {
  // Render up to 5 stars based on the rating
  const renderStars = (rating = 0) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));

  // Add to cart handler.
  // Uses callback if provided, else saves to localStorage and notifies with alert.
  const addToCart = () => {
    if (onAddToCart) {
      onAddToCart(book);
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => item.id === book.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...book, quantity: 1 }];
    }
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    // Fallback simple notification:
    window.alert('Book added to cart!');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img
          src={book.image || '/placeholder-book.png'}
          alt={book.title || 'Book cover'}
          className="w-full h-48 object-cover"
        />
        {book.condition && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {book.condition}
          </div>
        )}
        {book.price && (
          <div className="absolute bottom-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-lg text-xs font-bold">
            Rs. {book.price}
          </div>
        )}
        <button
          onClick={() => onRemove(book.id)}
          className="absolute top-3 left-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          aria-label="Remove from wishlist"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {book.category && (
            <span className="text-xs text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded-full">
              {book.category}
            </span>
          )}
          <div className="flex items-center space-x-1">
            {renderStars(book.rating)}
            <span className="text-sm text-gray-600">({book.rating || 0})</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{book.title || 'Untitled Book'}</h3>
        {book.author && (
          <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        )}
        {book.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{book.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          {book.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{book.location}</span>
            </div>
          )}
          {book.postedTime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{book.postedTime}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={addToCart}
            className="flex-1 bg-gradient-to-r from-black to-gray-800 text-white py-2 rounded-lg font-medium hover:from-gray-800 hover:to-black transition-all duration-200 flex items-center justify-center"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </button>
          <button
            onClick={() => onView && onView(book)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="View book"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

WishlistCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
    location: PropTypes.string,
    postedTime: PropTypes.string,
    condition: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onView: PropTypes.func,           // Optional, but enables book view modal/page
  onAddToCart: PropTypes.func,      // Optional, for custom toast/snackbar notifications
};

export default WishlistCard;
