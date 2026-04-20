import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-0">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-ghana-yellow/90 rounded-full mb-6">
            <span className="text-sm font-semibold text-gray-900">
              🌟 Premium Accommodation in Accra
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Experience Luxury Living
            <br />
            <span className="text-ghana-yellow">In The Heart of Ghana</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0">
            Discover our curated collection of premium apartments in Accra's most desirable locations. 
            Your perfect stay awaits with world-class amenities and Ghanaian hospitality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Link
              to="/apartments"
              className="bg-ghana-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Explore Apartments
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Booking Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto lg:mx-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Check In/Out */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in / Check-out
                </label>
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <FaCalendarAlt className="text-ghana-green mr-3" />
                  <input
                    type="text"
                    placeholder="Select dates"
                    className="bg-transparent w-full focus:outline-none text-gray-700"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <FaUsers className="text-ghana-green mr-3" />
                  <select className="bg-transparent w-full focus:outline-none text-gray-700">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full bg-ghana-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 flex items-center justify-center">
                  <FaSearch className="mr-2" />
                  Search Availability
                </button>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto lg:mx-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-ghana-yellow mb-1">50+</div>
              <div className="text-gray-300 text-sm">Luxury Apartments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ghana-yellow mb-1">4.9</div>
              <div className="text-gray-300 text-sm">Guest Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ghana-yellow mb-1">24/7</div>
              <div className="text-gray-300 text-sm">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;