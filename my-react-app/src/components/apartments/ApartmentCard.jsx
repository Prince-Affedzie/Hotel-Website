import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaStar, FaWifi, FaSnowflake, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ApartmentCard = ({ apartment }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available':
        return 'bg-green-500';
      case 'booked':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={apartment.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          alt={apartment.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`${getStatusColor(apartment.availability?.status)} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg`}>
            {apartment.availability?.status || 'available'}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
            <span className="text-xl font-bold text-ghana-green">
              {formatPrice(apartment.price)}
            </span>
            <span className="text-xs text-gray-600">/ night</span>
          </div>
        </div>

        {/* Rating Badge */}
        {apartment.rating && (
          <div className="absolute top-3 left-3">
            <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="font-semibold text-gray-900 text-sm">{apartment.rating}</span>
              <span className="text-xs text-gray-600">({apartment.reviews || 0})</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-ghana-green transition-colors line-clamp-1">
            {apartment.name}
          </h3>
          <p className="text-gray-600 text-sm flex items-center">
            <FaMapMarkerAlt className="text-ghana-green mr-1 text-xs" />
            <span className="line-clamp-1">{apartment.location}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-gray-100">
          <div className="flex items-center text-gray-600 text-sm">
            <FaBed className="mr-1.5 text-ghana-green text-sm" />
            <span>{apartment.bedrooms} {apartment.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FaBath className="mr-1.5 text-ghana-green text-sm" />
            <span>{apartment.bathrooms} {apartment.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FaRulerCombined className="mr-1.5 text-ghana-green text-sm" />
            <span>{apartment.size} {apartment.sizeUnit}</span>
          </div>
        </div>

        {/* Amenities Quick View */}
        <div className="flex items-center gap-3 mb-4">
          {apartment.amenities?.includes('wifi') && (
            <FaWifi className="text-gray-400 text-sm" title="Free WiFi" />
          )}
          {apartment.amenities?.includes('ac') && (
            <FaSnowflake className="text-gray-400 text-sm" title="Air Conditioning" />
          )}
          {apartment.amenities && apartment.amenities.length > 2 && (
            <span className="text-xs text-gray-500">
              +{apartment.amenities.length - 2} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/apartments/${apartment.id}`}
            className="flex-1 bg-gray-100 text-gray-900 text-center px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/booking/${apartment.id}`}
            className="flex-1 bg-ghana-green text-white text-center px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ApartmentCard;