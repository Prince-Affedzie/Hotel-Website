import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaWhatsapp,
  FaArrowRight,
  FaHeart
} from 'react-icons/fa';
import companyInfo from '../../data/companyInfo.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Apartments', path: '/apartments' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Now', path: '/apartments' }
  ];

  const services = [
    'Luxury Apartments',
    'Corporate Housing',
    'Vacation Rentals',
    'Long-term Stays',
    'Concierge Services',
    'Airport Transfers'
  ];

  const businessHours = companyInfo.company.businessHours;

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-ghana-green">Rash</span>
                <span className="text-ghana-yellow"> Luxury</span>
                <span className="text-ghana-red"> Apartments</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experience the finest accommodation in Accra with our premium apartments. 
                Your comfort and satisfaction are our top priorities.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href={companyInfo.company.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-ghana-green transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={companyInfo.company.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-ghana-green transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href={companyInfo.company.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-ghana-green transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href={companyInfo.company.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-ghana-green transition-all duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-ghana-yellow transition-colors flex items-center group"
                  >
                    <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    <span className="group-hover:translate-x-2 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-ghana-green mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  {companyInfo.company.address.street}<br />
                  {companyInfo.company.address.area}<br />
                  {companyInfo.company.address.city}, {companyInfo.company.address.country}
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-ghana-green mr-3 flex-shrink-0" />
                <a href={`tel:${companyInfo.company.phone}`} className="text-gray-400 hover:text-ghana-yellow transition-colors">
                  {companyInfo.company.phone}
                </a>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="text-green-500 mr-3 flex-shrink-0" />
                <a href={`https://wa.me/${companyInfo.company.whatsapp}`} className="text-gray-400 hover:text-ghana-yellow transition-colors">
                  {companyInfo.company.mobile}
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-ghana-green mr-3 flex-shrink-0" />
                <a href={`mailto:${companyInfo.company.email}`} className="text-gray-400 hover:text-ghana-yellow transition-colors">
                  {companyInfo.company.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <FaClock className="text-ghana-green mr-2 text-sm" />
                  <span>Mon-Fri: {businessHours.monday.split('-')[0]}</span>
                </li>
                <li className="text-sm ml-6">- {businessHours.monday}</li>
                <li className="text-sm ml-6">Sat: {businessHours.saturday}</li>
                <li className="text-sm ml-6">Sun: {businessHours.sunday}</li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">
                Subscribe for exclusive offers and updates
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-ghana-green transition-colors"
                />
                <button
                  type="submit"
                  className="bg-ghana-green px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-lg font-semibold mb-4 text-center">Our Services</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-ghana-green hover:text-white transition-all duration-200 cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {companyInfo.company.name}. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-ghana-yellow text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-ghana-yellow text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-ghana-yellow text-sm transition-colors">
                FAQ
              </Link>
            </div>

            <p className="text-gray-400 text-sm flex items-center">
              Made with <FaHeart className="text-ghana-red mx-1" /> in Ghana
            </p>
          </div>
        </div>
      </div>

      {/* Ghana Flag Colors Bar */}
      <div className="flex h-1">
        <div className="flex-1 bg-ghana-red" />
        <div className="flex-1 bg-ghana-yellow" />
        <div className="flex-1 bg-ghana-green" />
      </div>
    </footer>
  );
};

export default Footer;