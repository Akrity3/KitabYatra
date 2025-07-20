import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Search, Filter, Grid, List, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

  
      <Footer />

};

export default BrowsePage;
