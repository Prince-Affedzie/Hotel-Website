import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedApartments from '../components/home/FeaturedApartments';
import AmenitiesSection from '../components/home/AmenitiesSection';
import Testimonials from '../components/home/Testimonials';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
       {/*<h1>Home Page</h1>;*/} 
      <HeroSection />
      <FeaturedApartments />
      <AmenitiesSection />
      <Testimonials />
    </div>
  );
};

export default HomePage;