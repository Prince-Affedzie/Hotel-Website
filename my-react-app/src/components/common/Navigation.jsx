import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import companyInfo from '../../data/companyInfo.json';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/apartments', label: 'Apartments' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About ' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-ghana-green to-ghana-yellow rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {companyInfo.company.name}
                </h1>
                {/*<p className="text-xs text-gray-600">Luxury Living in Accra</p>*/}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-ghana-green'
                      : 'text-gray-700 hover:text-ghana-green'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ghana-green rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              <a
                href={`tel:${companyInfo.company.phone}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-ghana-green transition-colors"
              >
                <FaPhone className="text-sm" />
                <span className="text-sm font-medium">{companyInfo.company.phone}</span>
              </a>
              
              <a
                href={`https://wa.me/${companyInfo.company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <FaWhatsapp className="text-lg" />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
            </div>

            {/* Book Now Button */}
            <Link
              to="/apartments"
              className="bg-ghana-red text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-ghana-green focus:outline-none transition-colors"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-20 bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-ghana-green/10 text-ghana-green'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <a
                href={`tel:${companyInfo.company.phone}`}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <FaPhone className="text-ghana-green" />
                <span>{companyInfo.company.phone}</span>
              </a>
              
              <a
                href={`https://wa.me/${companyInfo.company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-4 py-3 text-green-600 hover:bg-green-50 rounded-lg"
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/apartments"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-ghana-red text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-red-700 transition-colors"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;