import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes, FaSearch, FaSlidersH, FaMapMarkerAlt } from 'react-icons/fa';
import ApartmentCard from '../components/apartments/ApartmentCard';
import ApartmentFilters from '../components/apartments/ApartmentFilters';
import useApartments from '../hooks/useApartments';

const ApartmentsPage = () => {
  const { apartments, loading, filterApartments } = useApartments();
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    bedrooms: 'any',
    location: '',
    amenities: [],
    sortBy: 'recommended'
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Apply filters when apartments load or filters change
    if (apartments.length > 0) {
      let filtered = filterApartments(filters);
      
      // Apply search query
      if (searchQuery) {
        filtered = filtered.filter(apt => 
          apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply sorting
      filtered = sortApartments(filtered, filters.sortBy);
      
      setFilteredApartments(filtered);
    }
  }, [apartments, filters, searchQuery]);

  const sortApartments = (apts, sortBy) => {
    switch(sortBy) {
      case 'price-low':
        return [...apts].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...apts].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...apts].sort((a, b) => b.rating - a.rating);
      case 'bedrooms':
        return [...apts].sort((a, b) => b.bedrooms - a.bedrooms);
      default:
        return apts;
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      bedrooms: 'any',
      location: '',
      amenities: [],
      sortBy: 'recommended'
    });
    setSearchQuery('');
  };

  const locations = [...new Set(apartments.map(apt => apt.location))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-ghana-green to-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Find Your Perfect Apartment
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover our collection of premium apartments in Accra's most desirable locations
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mt-8"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ghana-yellow shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredApartments.length} Apartments Available
              </h2>
              <p className="text-gray-600 mt-1">
                in Accra, Ghana
              </p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                className="flex-1 lg:flex-none px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="bedrooms">Most Bedrooms</option>
              </select>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden bg-ghana-green text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition-colors"
              >
                <FaFilter />
                Filter
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.location || filters.bedrooms !== 'any' || filters.amenities.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Active Filters:</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-ghana-red hover:text-red-700 text-sm"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.location && (
                  <span className="px-3 py-1 bg-ghana-green/10 text-ghana-green rounded-full text-sm flex items-center gap-2">
                    Location: {filters.location}
                    <button onClick={() => handleFilterChange({ location: '' })}>
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                )}
                {filters.bedrooms !== 'any' && (
                  <span className="px-3 py-1 bg-ghana-green/10 text-ghana-green rounded-full text-sm flex items-center gap-2">
                    {filters.bedrooms}+ Bedrooms
                    <button onClick={() => handleFilterChange({ bedrooms: 'any' })}>
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                )}
                {filters.amenities.map(amenity => (
                  <span key={amenity} className="px-3 py-1 bg-ghana-green/10 text-ghana-green rounded-full text-sm flex items-center gap-2 capitalize">
                    {amenity}
                    <button onClick={() => {
                      const newAmenities = filters.amenities.filter(a => a !== amenity);
                      handleFilterChange({ amenities: newAmenities });
                    }}>
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <ApartmentFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                locations={locations}
              />
            </div>

            {/* Apartments Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-lg p-4 animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredApartments.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredApartments.map((apartment, index) => (
                    <motion.div
                      key={apartment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ApartmentCard apartment={apartment} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏢</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Apartments Found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-ghana-green text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-bold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-full pb-20">
                <ApartmentFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  locations={locations}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-ghana-green text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApartmentsPage;