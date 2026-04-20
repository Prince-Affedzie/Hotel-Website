import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';
import testimonialsData from '../../data/testimonials.json';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    // Load testimonials from data file
    setTestimonials(testimonialsData.testimonials || getDefaultTestimonials());
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const getDefaultTestimonials = () => [
    {
      id: 1,
      name: "Akua Mensah",
      location: "London, UK",
      rating: 5,
      comment: "Absolutely stunning apartment! The views of Accra are breathtaking, and the amenities exceeded our expectations. The staff was incredibly helpful and made our stay memorable.",
      avatar: null,
      stayDate: "December 2024",
      apartment: "Ocean View Suite"
    },
    {
      id: 2,
      name: "Kwame Asante",
      location: "New York, USA",
      rating: 5,
      comment: "Best accommodation experience in Ghana. The apartment was spotless, modern, and perfectly located. Will definitely be my go-to place whenever I'm in Accra.",
      avatar: null,
      stayDate: "January 2025",
      apartment: "Executive Apartment"
    },
    {
      id: 3,
      name: "Sarah & John Thompson",
      location: "Toronto, Canada",
      rating: 4,
      comment: "Our family had a wonderful time here. The apartment was spacious and child-friendly. Great location near restaurants and shops. Highly recommended for families!",
      avatar: null,
      stayDate: "November 2024",
      apartment: "Family Garden Apartment"
    },
    {
      id: 4,
      name: "Nana Yaa Boateng",
      location: "Accra, Ghana",
      rating: 5,
      comment: "Perfect staycation spot! The infinity pool and fitness center are world-class. It's amazing to find such quality accommodation right here in Accra.",
      avatar: null,
      stayDate: "December 2024",
      apartment: "Penthouse Suite"
    },
    {
      id: 5,
      name: "Michael Osei",
      location: "Amsterdam, Netherlands",
      rating: 5,
      comment: "Exceptional service from start to finish. The concierge helped arrange everything from airport pickup to restaurant reservations. Truly five-star experience!",
      avatar: null,
      stayDate: "January 2025",
      apartment: "Luxury Studio"
    }
  ];

  const nextTestimonial = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        } text-xl`}
      />
    ));
  };

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-ghana-green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ghana-yellow rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-ghana-red/10 text-ghana-red rounded-full text-sm font-semibold mb-4">
            Guest Experiences
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-ghana-green">Guests Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied guests 
            about their exceptional experiences
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8">
                <div className="bg-gradient-to-br from-ghana-green to-ghana-yellow p-4 rounded-2xl shadow-lg">
                  <FaQuoteLeft className="text-white text-2xl" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Guest Info */}
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-4">
                      {testimonials[currentIndex].avatar ? (
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-ghana-green/20"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-ghana-green to-ghana-yellow flex items-center justify-center">
                          <FaUserCircle className="text-white text-5xl" />
                        </div>
                      )}
                      <div className="absolute -bottom-2 right-0 bg-ghana-green text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {testimonials[currentIndex].location}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>

                    {/* Stay Details */}
                    <div className="bg-gray-50 rounded-lg p-3 w-full">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Stayed in:</span> {testimonials[currentIndex].apartment}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Date:</span> {testimonials[currentIndex].stayDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="md:col-span-2 flex items-center">
                  <div>
                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      "{testimonials[currentIndex].comment}"
                    </p>
                    
                    {/* Additional Info */}
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1 text-ghana-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Verified Stay
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1 text-ghana-green" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        Booking.com Verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-ghana-green hover:text-white"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-ghana-green hover:text-white"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-xl" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-ghana-green'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Review Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl shadow-lg px-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-ghana-green">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-ghana-green">500+</div>
              <div className="text-sm text-gray-600">Happy Guests</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-ghana-green">98%</div>
              <div className="text-sm text-gray-600">Recommend Us</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;