import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import ApartmentsPage from './pages/Apartments';
import ApartmentDetailPage from './pages/ApartmentDetail';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import AboutPage from './pages/About';
import BookingPage from './pages/BookingPage';

import { BookingProvider } from './context/BookingContext';
import './App.css';
import { useLocation } from 'react-router-dom'

function App() {
  
  return (
    <BookingProvider>
      <Router>
       
        <Routes>
          <Route path="/" element={<MainLayout />}> 
            <Route index element={<HomePage />} />
            <Route path="apartments" element={<ApartmentsPage />} />
             <Route path="apartments/:id" element={<ApartmentDetailPage />} />
             <Route path="gallery" element={<GalleryPage />} />
             <Route path="contact" element={<ContactPage />} />
             <Route path="about" element={<AboutPage />} />
            <Route path="booking/:id" element={<BookingPage />} />
            
            
            
          </Route>
          </Routes>
        
      </Router>
    </BookingProvider>
  );
}

export default App;