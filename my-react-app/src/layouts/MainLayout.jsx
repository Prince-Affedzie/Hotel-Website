import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaArrowUp, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import companyInfo from '../data/companyInfo.json';

const MainLayout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg bg-white' : 'bg-transparent'
      }`}>
        {/* Top Bar */}
        <div className="hidden lg:block bg-ghana-green text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{companyInfo.company.address.area}, {companyInfo.company.address.city}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <a href={`mailto:${companyInfo.company.email}`} className="hover:text-ghana-yellow transition-colors">
                    {companyInfo.company.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span>Follow us:</span>
                <div className="flex space-x-3">
                  {/* Social Icons logic remains same */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <Navigation />
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-[88px]" />

      {/* Main Content with Page Transitions */}
      
        <motion.main
          key={location.pathname} // Tracks URL to trigger animations
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-grow"
        >
          {/* CRITICAL CHANGE: 
            Outlet renders the current route's element (Home, Apartments, etc.)
          */}
          <Outlet /> 
        </motion.main>
      

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp & Call buttons logic remains same */}
        <motion.a
          href={`https://wa.me/${companyInfo.company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
        >
          <FaWhatsapp className="text-2xl" />
        </motion.a>
        
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={scrollToTop}
              className="bg-ghana-red text-white p-4 rounded-full shadow-lg"
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Info Bar - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-40">
        <div className="grid grid-cols-3 gap-1 p-2 text-center">
            {/* Mobile quick links logic */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;