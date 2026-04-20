import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaStar, 
  FaWifi, 
  FaSnowflake, 
  FaParking, 
  FaSwimmingPool, 
  FaDumbbell, 
  FaUtensils, 
  FaTv, 
  FaWind,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCompress,
  FaShareAlt,
  FaHeart,
  FaCalendarAlt,
  FaClock,
  FaShieldAlt,
  FaKey,
  FaConciergeBell,
  FaArrowLeft,
  FaWhatsapp,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { MdKitchen, MdBalcony, MdLocalLaundryService, MdPets } from 'react-icons/md';
import useApartments from '../hooks/useApartments';
import { useBooking } from '../context/BookingContext';
import companyInfo from '../data/companyInfo.json';

const ApartmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApartmentById, checkAvailability } = useApartments();
  const { dispatch } = useBooking();
  
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  
  // Booking states
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Load apartment data
    const loadApartment = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const apt = getApartmentById(id);
      setApartment(apt);
      setLoading(false);
    };
    
    loadApartment();
  }, [id,getApartmentById]);

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    setCheckingAvailability(true);
    setTimeout(() => {
      const available = checkAvailability(id, checkInDate, checkOutDate);
      setIsAvailable(available);
      setCheckingAvailability(false);
    }, 500);
  };

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select dates first');
      return;
    }
    
    if (!isAvailable) {
      alert('Selected dates are not available');
      return;
    }
    
    // Update booking context
    dispatch({ type: 'SELECT_APARTMENT', payload: apartment });
    dispatch({ 
      type: 'SET_DATES', 
      payload: { checkIn: checkInDate, checkOut: checkOutDate } 
    });
    dispatch({ type: 'SET_GUESTS', payload: guests });
    
    // Navigate to booking page
    navigate(`/booking/${id}`);
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!apartment) return 0;
    const nights = calculateNights();
    return nights * apartment.price;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAmenityIcon = (amenityId) => {
    const icons = {
      wifi: FaWifi,
      ac: FaSnowflake,
      kitchen: MdKitchen,
      parking: FaParking,
      pool: FaSwimmingPool,
      gym: FaDumbbell,
      tv: FaTv,
      balcony: MdBalcony,
      laundry: MdLocalLaundryService,
      pets: MdPets
    };
    return icons[amenityId] || FaCheckCircle;
  };

  const nextImage = () => {
    if (apartment?.images) {
      setSelectedImage((prev) => (prev + 1) % apartment.images.length);
    }
  };

  const prevImage = () => {
    if (apartment?.images) {
      setSelectedImage((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment?.name,
        text: `Check out ${apartment?.name} in Accra, Ghana`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-8"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Apartment Not Found</h2>
          <p className="text-gray-600 mb-6">The apartment you're looking for doesn't exist.</p>
          <Link
            to="/apartments"
            className="inline-flex items-center gap-2 bg-ghana-green text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
          >
            <FaArrowLeft />
            Back to Apartments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-ghana-green">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/apartments" className="text-gray-600 hover:text-ghana-green">Apartments</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{apartment.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {apartment.name}
              </h1>
              {apartment.rating && (
                <div className="flex items-center gap-1 bg-ghana-green/10 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{apartment.rating}</span>
                  <span className="text-gray-600 text-sm">({apartment.reviews} reviews)</span>
                </div>
              )}
            </div>
            <p className="text-gray-600 flex items-center gap-2">
              <FaMapMarkerAlt className="text-ghana-green" />
              {apartment.location}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                aria-label="Share"
              >
                <FaShareAlt className="text-gray-600" />
              </button>
              {showShareTooltip && (
                <div className="absolute top-full mt-2 right-0 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap">
                  Link copied!
                </div>
              )}
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${
                isFavorite ? 'text-ghana-red' : 'text-gray-400'
              }`}
              aria-label="Add to favorites"
            >
              <FaHeart />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-8">
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden bg-gray-200">
            <img
              src={apartment.images?.[selectedImage] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
              alt={apartment.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {apartment.images && apartment.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
            
            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {apartment.images?.length || 1}
            </div>
          </div>
          
          {/* Thumbnail Strip */}
          {apartment.images && apartment.images.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
              {apartment.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-ghana-green' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About this apartment</h2>
              <p className="text-gray-700 leading-relaxed">{apartment.description}</p>
            </section>

            {/* Features */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaUsers className="text-ghana-green text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Max Guests</p>
                    <p className="font-semibold">{apartment.maxGuests} Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaBed className="text-ghana-green text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold">{apartment.bedrooms} Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaBath className="text-ghana-green text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold">{apartment.bathrooms} Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaRulerCombined className="text-ghana-green text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Size</p>
                    <p className="font-semibold">{apartment.size} {apartment.sizeUnit}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {apartment.amenities?.map((amenityId) => {
                  const Icon = getAmenityIcon(amenityId);
                  const labels = {
                    wifi: 'High-speed WiFi',
                    ac: 'Air Conditioning',
                    kitchen: 'Full Kitchen',
                    parking: 'Free Parking',
                    pool: 'Swimming Pool',
                    gym: 'Fitness Center',
                    tv: 'Smart TV',
                    balcony: 'Private Balcony',
                    laundry: 'Laundry',
                    pets: 'Pet Friendly'
                  };
                  return (
                    <div key={amenityId} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-ghana-green/10 rounded-lg flex items-center justify-center">
                        <Icon className="text-ghana-green text-lg" />
                      </div>
                      <span className="text-gray-700">{labels[amenityId] || amenityId}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="flex items-start gap-3 mb-4">
                <FaMapMarkerAlt className="text-ghana-green text-xl mt-1" />
                <div>
                  <p className="font-semibold text-lg">{apartment.location}</p>
                  <p className="text-gray-600">
                    Accra, Greater Accra Region, Ghana
                  </p>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="Apartment Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.890123456789!2d-0.123456!3d5.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDcnMjQuNCJOIDDCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>

            {/* House Rules */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">House Rules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FaClock className="text-ghana-green text-lg mt-1" />
                  <div>
                    <p className="font-semibold">Check-in: 3:00 PM - 10:00 PM</p>
                    <p className="text-gray-600 text-sm">Check-out: 11:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaKey className="text-ghana-green text-lg mt-1" />
                  <div>
                    <p className="font-semibold">Self check-in</p>
                    <p className="text-gray-600 text-sm">Smart lock with keycode</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUsers className="text-ghana-green text-lg mt-1" />
                  <div>
                    <p className="font-semibold">{apartment.maxGuests} guests maximum</p>
                    <p className="text-gray-600 text-sm">No parties or events</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdPets className="text-ghana-green text-lg mt-1" />
                  <div>
                    <p className="font-semibold">
                      {apartment.amenities?.includes('pets') ? 'Pets allowed' : 'No pets'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {apartment.amenities?.includes('pets') ? 'With prior approval' : 'Service animals welcome'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(apartment.price)}
                    </span>
                    <span className="text-gray-600">/ night</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaStar className="text-yellow-400" />
                    <span>{apartment.rating} · {apartment.reviews} reviews</span>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => {
                          setCheckInDate(e.target.value);
                          setIsAvailable(null);
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => {
                          setCheckOutDate(e.target.value);
                          setIsAvailable(null);
                        }}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
                    >
                      {[...Array(apartment.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Check Availability Button */}
                  <button
                    onClick={handleCheckAvailability}
                    disabled={checkingAvailability || !checkInDate || !checkOutDate}
                    className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkingAvailability ? 'Checking...' : 'Check Availability'}
                  </button>

                  {/* Availability Status */}
                  {isAvailable !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        isAvailable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      {isAvailable ? (
                        <div className="flex items-center gap-2 text-green-700">
                          <FaCheckCircle />
                          <span>Available for your selected dates!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-700">
                          <FaTimes />
                          <span>Not available for selected dates</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Price Breakdown */}
                  {checkInDate && checkOutDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t pt-4 space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {formatPrice(apartment.price)} x {calculateNights()} nights
                        </span>
                        <span>{formatPrice(calculateTotal())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cleaning fee</span>
                        <span>{formatPrice(50)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service fee</span>
                        <span>{formatPrice(30)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>{formatPrice(calculateTotal() + 80)}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Book Now Button */}
                  <button
                    onClick={handleBookNow}
                    disabled={!isAvailable || !checkInDate || !checkOutDate}
                    className="w-full bg-ghana-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Now
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    You won't be charged yet
                  </p>
                </div>

                {/* Contact Host */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Have questions?</h3>
                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${companyInfo.company.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <FaWhatsapp className="text-xl" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${companyInfo.company.email}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaEnvelope />
                      <span>Send an email</span>
                    </a>
                    <a
                      href={`tel:${companyInfo.company.phone}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaPhone />
                      <span>Call us</span>
                    </a>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                    <div>
                      <FaShieldAlt className="mx-auto text-ghana-green text-xl mb-1" />
                      <span>Secure Booking</span>
                    </div>
                    <div>
                      <FaCheckCircle className="mx-auto text-ghana-green text-xl mb-1" />
                      <span>Verified Host</span>
                    </div>
                    <div>
                      <FaConciergeBell className="mx-auto text-ghana-green text-xl mb-1" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
            
            <div className="relative h-full flex items-center justify-center">
              <img
                src={apartment.images?.[selectedImage]}
                alt={apartment.name}
                className="max-h-full max-w-full object-contain"
              />
              
              {apartment.images && apartment.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <FaChevronLeft className="text-2xl" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <FaChevronRight className="text-2xl" />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {selectedImage + 1} / {apartment.images?.length || 1}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApartmentDetailPage;