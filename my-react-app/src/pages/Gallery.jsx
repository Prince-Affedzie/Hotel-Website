import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearch,
  FaFilter,
  FaHome,
  FaBuilding,
  FaUmbrellaBeach,
  FaSwimmingPool,
  FaCity,
  FaTree,
  FaBed,
  FaUtensils,
  FaCamera,
  FaPlay,
  FaImages,
  FaDownload,
  FaShareAlt,
  FaExpand,
  FaCompress,
  FaHeart,
  FaRegHeart
} from 'react-icons/fa';
import galleryData from '../data/gallery.json';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [layout, setLayout] = useState('grid'); // grid, masonry, list
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load gallery data
    const loadGallery = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use data from JSON or fallback to default
      const items = galleryData?.gallery || getDefaultGalleryItems();
      setGalleryItems(items);
      setFilteredItems(items);
      setIsLoading(false);
    };
    
    loadGallery();
  }, []);

  useEffect(() => {
    // Filter items based on category and search
    let filtered = galleryItems;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery, galleryItems]);

  const getDefaultGalleryItems = () => [
    {
      id: 1,
      title: "Luxury Ocean View Suite",
      category: "apartments",
      type: "image",
      location: "Labadi Beach, Accra",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Stunning ocean views from this premium penthouse suite"
    },
    {
      id: 2,
      title: "Infinity Pool at Sunset",
      category: "amenities",
      type: "image",
      location: "Rooftop, Accra",
      url: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Relax by our infinity pool with panoramic city views"
    },
    {
      id: 3,
      title: "Modern Living Room",
      category: "interiors",
      type: "image",
      location: "Executive Suite, Airport Residential",
      url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Contemporary design with premium furnishings"
    },
    {
      id: 4,
      title: "Fully Equipped Kitchen",
      category: "interiors",
      type: "image",
      location: "Family Apartment, East Legon",
      url: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Modern kitchen with all amenities for your culinary needs"
    },
    {
      id: 5,
      title: "Luxury Bedroom Suite",
      category: "interiors",
      type: "image",
      location: "Penthouse, Cantonments",
      url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Spacious master bedroom with premium bedding"
    },
    {
      id: 6,
      title: "Fitness Center",
      category: "amenities",
      type: "image",
      location: "Ground Floor, All Properties",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "State-of-the-art gym equipment for your workout"
    },
    {
      id: 7,
      title: "Rooftop Terrace",
      category: "exterior",
      type: "image",
      location: "Labone Luxury Apartments",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Perfect spot for evening relaxation and entertainment"
    },
    {
      id: 8,
      title: "Dining Area",
      category: "interiors",
      type: "image",
      location: "Executive Apartments",
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Elegant dining space for memorable meals"
    },
    {
      id: 9,
      title: "Building Exterior",
      category: "exterior",
      type: "image",
      location: "Airport Residential Area",
      url: "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Modern architectural design in prime location"
    },
    {
      id: 10,
      title: "Garden Area",
      category: "exterior",
      type: "image",
      location: "Family Apartments, East Legon",
      url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Beautifully landscaped gardens for peaceful moments"
    },
    {
      id: 11,
      title: "Spa & Wellness",
      category: "amenities",
      type: "image",
      location: "Premium Properties",
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Relax and rejuvenate in our luxury spa facilities"
    },
    {
      id: 12,
      title: "Bathroom Suite",
      category: "interiors",
      type: "image",
      location: "Luxury Apartments",
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Modern bathroom with premium fixtures"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', icon: FaImages, count: galleryItems.length },
    { id: 'apartments', label: 'Apartments', icon: FaBuilding, count: galleryItems.filter(i => i.category === 'apartments').length },
    { id: 'interiors', label: 'Interiors', icon: FaHome, count: galleryItems.filter(i => i.category === 'interiors').length },
    { id: 'exterior', label: 'Exterior', icon: FaCity, count: galleryItems.filter(i => i.category === 'exterior').length },
    { id: 'amenities', label: 'Amenities', icon: FaUmbrellaBeach, count: galleryItems.filter(i => i.category === 'amenities').length }
  ];

  const handleItemClick = (item, index) => {
    setSelectedItem(item);
    setCurrentImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    setIsFullscreen(false);
  };

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const handlePrev = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (item) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: item.url
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(item.url);
      alert('Image URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
  className="relative py-20 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />
  
  {/* Subtle pattern overlay for texture */}
  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Optional: Gallery badge */}
      <div className="inline-block mb-4">
        <span className="bg-ghana-yellow/20 backdrop-blur-sm text-ghana-yellow px-4 py-1 rounded-full text-sm font-semibold">
          Our Collection
        </span>
      </div>
      
      <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
        Photo Gallery
      </h1>
      <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow">
        Explore our collection of stunning apartments, interiors, and amenities
      </p>
    </motion.div>

    {/* Search Bar */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-2xl mx-auto mt-8"
    >
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl z-10" />
        <input
          type="text"
          placeholder="Search photos by title, location, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ghana-yellow shadow-lg bg-white/95 backdrop-blur-sm"
        />
      </div>
    </motion.div>
  </div>
</section>

      {/* Category Filters */}
      <section className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-ghana-green text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{category.label}</span>
                    <span className={`text-xs ${
                      selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      ({category.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Layout Toggle & Filter Button */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  layout === 'grid' ? 'bg-ghana-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Grid Layout"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setLayout('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  layout === 'masonry' ? 'bg-ghana-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Masonry Layout"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 000 2h5a1 1 0 100-2H3zM3 7a1 1 0 000 2h8a1 1 0 100-2H3zM3 11a1 1 0 100 2h3a1 1 0 100-2H3zM13 3a1 1 0 100 2h3a1 1 0 100-2h-3zM11 7a1 1 0 100 2h5a1 1 0 100-2h-5zM13 11a1 1 0 100 2h3a1 1 0 100-2h-3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className={`grid ${
              layout === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'columns-1 md:columns-2 lg:columns-3 gap-6'
            }`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`bg-white rounded-xl shadow-lg overflow-hidden animate-pulse ${
                  layout === 'masonry' ? 'mb-6 break-inside-avoid' : ''
                }`}>
                  <div className="h-64 bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={layout === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'columns-1 md:columns-2 lg:columns-3 gap-6'
              }
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                    layout === 'masonry' ? 'mb-6 break-inside-avoid' : ''
                  }`}
                  onClick={() => handleItemClick(item, index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.thumbnail || item.url}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                        {categories.find(c => c.id === item.category)?.label || item.category}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                    >
                      {favorites.includes(item.id) ? (
                        <FaHeart className="text-ghana-red" />
                      ) : (
                        <FaRegHeart className="text-gray-700" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      {item.location && (
                        <p className="text-sm text-gray-200 mb-2">{item.location}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Photos Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="bg-ghana-green text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 ${
              isFullscreen ? 'bg-black' : 'bg-black/95'
            } flex items-center justify-center`}
            onClick={handleCloseLightbox}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                  {selectedItem.location && (
                    <p className="text-sm text-gray-300">{selectedItem.location}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFavorite(selectedItem.id)}
                    className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {favorites.includes(selectedItem.id) ? (
                      <FaHeart className="text-ghana-red" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(selectedItem)}
                    className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <FaShareAlt />
                  </button>
                  <button
                    onClick={() => handleDownload(selectedItem.url, selectedItem.title)}
                    className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                  <button
                    onClick={handleCloseLightbox}
                    className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div 
              className={`relative ${
                isFullscreen ? 'w-full h-full' : 'max-w-7xl max-h-[90vh] px-4'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className={`${
                  isFullscreen 
                    ? 'w-full h-full object-contain' 
                    : 'max-w-full max-h-[85vh] object-contain rounded-lg'
                }`}
              />

              {/* Navigation Arrows */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <FaChevronLeft className="text-2xl" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <FaChevronRight className="text-2xl" />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {filteredItems.length}
              </div>
            </div>

            {/* Description */}
            {!isFullscreen && selectedItem.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <p className="text-lg">{selectedItem.description}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;