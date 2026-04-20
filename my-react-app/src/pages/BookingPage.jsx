import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaHome,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaStar,
  FaWifi,
  FaSnowflake,
  FaCheck,
  FaTimes,
  FaClock,
  FaShieldAlt,
  FaConciergeBell,
  FaCar,
  FaWhatsapp,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaRegClock,
  FaRegCheckCircle,
  FaChevronRight,
  FaChevronDown,
  FaCreditCard,
  FaLock,
  FaUserFriends,
  FaChild,
  FaBaby,
  FaUtensils,
  FaTv,
  FaWind,
  FaSwimmingPool,
  FaDumbbell,
  FaParking
} from 'react-icons/fa';
import { MdKitchen, MdBalcony, MdLocalLaundryService, MdPets } from 'react-icons/md';
import useApartments from '../hooks/useApartments';
import { useBooking } from '../context/BookingContext';
import companyInfo from '../data/companyInfo.json';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApartmentById, checkAvailability, } = useApartments();
  const { state, dispatch } = useBooking();
  
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [priceBreakdown, setPriceBreakdown] = useState({
    nights: 0,
    nightlyRate: 0,
    subtotal: 0,
    cleaningFee: 50,
    serviceFee: 30,
    total: 0
  });
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      checkInDate: '',
      checkOutDate: '',
      guests: 2,
      adults: 2,
      children: 0,
      infants: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 'Ghana',
      specialRequests: '',
      paymentMethod: 'card',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      cardName: '',
      agreeToTerms: false,
      agreeToPolicy: false
    }
  });

  const watchCheckIn = watch('checkInDate');
  const watchCheckOut = watch('checkOutDate');
  const watchGuests = watch('guests');
  const watchAdults = watch('adults');
  const watchChildren = watch('children');
  const watchInfants = watch('infants');
  const watchPaymentMethod = watch('paymentMethod');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Load apartment data
    const loadApartment = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const apt = getApartmentById(id);
      
      if (apt) {
        setApartment(apt);
        dispatch({ type: 'SELECT_APARTMENT', payload: apt });
        
        // Pre-fill from context if available
        if (state.checkInDate) {
          setValue('checkInDate', state.checkInDate);
        }
        if (state.checkOutDate) {
          setValue('checkOutDate', state.checkOutDate);
        }
        if (state.guests) {
          setValue('guests', state.guests);
          setValue('adults', state.guests);
        }
        if (state.customerInfo) {
          setValue('firstName', state.customerInfo.firstName || '');
          setValue('lastName', state.customerInfo.lastName || '');
          setValue('email', state.customerInfo.email || '');
          setValue('phone', state.customerInfo.phone || '');
        }
      }
      
      setLoading(false);
    };
    
    loadApartment();
  }, [getApartmentById]);

  useEffect(() => {
    // Update total guests when adults/children change
    const total = (parseInt(watchAdults) || 0) + (parseInt(watchChildren) || 0);
    setValue('guests', total);
  }, [watchAdults, watchChildren, setValue]);

  useEffect(() => {
    // Calculate price breakdown when dates change
    if (apartment && watchCheckIn && watchCheckOut) {
      const start = new Date(watchCheckIn);
      const end = new Date(watchCheckOut);
      const diffTime = Math.abs(end - start);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const subtotal = nights * apartment.price;
      const discount = promoDiscount > 0 ? (subtotal * promoDiscount / 100) : 0;
      const total = subtotal + priceBreakdown.cleaningFee + priceBreakdown.serviceFee - discount;
      
      setPriceBreakdown({
        nights,
        nightlyRate: apartment.price,
        subtotal,
        cleaningFee: priceBreakdown.cleaningFee,
        serviceFee: priceBreakdown.serviceFee,
        discount,
        total: total > 0 ? total : 0
      });
    }
  }, [apartment, watchCheckIn, watchCheckOut, promoDiscount]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateNights = () => {
    if (!watchCheckIn || !watchCheckOut) return 0;
    const start = new Date(watchCheckIn);
    const end = new Date(watchCheckOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const generateBookingReference = () => {
    const prefix = 'GLA';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleCheckAvailability = async () => {
    if (!watchCheckIn || !watchCheckOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    setCheckingAvailability(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const available = checkAvailability(id, watchCheckIn, watchCheckOut);
    setIsAvailable(available);
    setCheckingAvailability(false);
  };

  const handleApplyPromo = () => {
    // Demo promo codes
    const promoCodes = {
      'WELCOME10': 10,
      'STAYLONG': 15,
      'GHANA20': 20
    };
    
    if (promoCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(promoCodes[promoCode.toUpperCase()]);
      alert(`Promo code applied! ${promoCodes[promoCode.toUpperCase()]}% discount`);
    } else {
      alert('Invalid promo code');
    }
  };

  const onSubmit = async (data) => {
    if (!isAvailable) {
      alert('Please check availability first');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate booking reference
    const reference = generateBookingReference();
    setBookingReference(reference);
    
    // Save to booking context
    dispatch({ 
      type: 'SET_DATES', 
      payload: { 
        checkIn: data.checkInDate, 
        checkOut: data.checkOutDate 
      } 
    });
    dispatch({ 
      type: 'SET_GUESTS', 
      payload: data.guests 
    });
    dispatch({ 
      type: 'SET_CUSTOMER_INFO', 
      payload: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests
      }
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    return icons[amenityId] || FaCheck;
  };

  const getAmenityLabel = (amenityId) => {
    const labels = {
      wifi: 'High-speed WiFi',
      ac: 'Air Conditioning',
      kitchen: 'Full Kitchen',
      parking: 'Free Parking',
      pool: 'Swimming Pool',
      gym: 'Fitness Center',
      tv: 'Smart TV',
      balcony: 'Private Balcony',
      laundry: 'Washer & Dryer',
      pets: 'Pet Friendly'
    };
    return labels[amenityId] || amenityId;
  };

  // Success Screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Success Header */}
            <div className="bg-gradient-to-r from-ghana-green to-green-700 text-white py-12 px-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <FaCheckCircle className="text-ghana-green text-5xl" />
              </motion.div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-white/90 text-lg">
                Your reservation has been successfully completed
              </p>
            </div>

            <div className="p-8 lg:p-12">
              {/* Booking Reference */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-center">
                <p className="text-sm text-gray-600 mb-2">Booking Reference Number</p>
                <p className="text-3xl font-mono font-bold text-ghana-green mb-2">
                  {bookingReference}
                </p>
                <p className="text-gray-600">
                  Confirmation sent to <strong>{getValues('email')}</strong>
                </p>
              </div>

              {/* Booking Summary */}
              {apartment && (
                <div className="border border-gray-200 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={apartment.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
                        alt={apartment.name}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                      <h4 className="font-bold text-lg">{apartment.name}</h4>
                      <p className="text-gray-600 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-ghana-green text-sm" />
                        {apartment.location}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Check-in</span>
                        <span className="font-semibold">{formatDate(watchCheckIn)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Check-out</span>
                        <span className="font-semibold">{formatDate(watchCheckOut)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Guests</span>
                        <span className="font-semibold">{watchGuests} {watchGuests > 1 ? 'Guests' : 'Guest'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Total Nights</span>
                        <span className="font-semibold">{priceBreakdown.nights}</span>
                      </div>
                      <div className="flex justify-between py-2 text-lg font-bold">
                        <span>Total Paid</span>
                        <span className="text-ghana-green">{formatPrice(priceBreakdown.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4">
                  <FaRegClock className="text-blue-600 text-xl mb-2" />
                  <h4 className="font-semibold mb-1">Check-in Time</h4>
                  <p className="text-sm text-gray-600">From 3:00 PM</p>
                  <p className="text-sm text-gray-600">Early check-in on request</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <FaKey className="text-green-600 text-xl mb-2" />
                  <h4 className="font-semibold mb-1">Access Code</h4>
                  <p className="text-sm text-gray-600">Sent 24 hours before arrival</p>
                  <p className="text-sm text-gray-600">Self check-in available</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <FaConciergeBell className="text-purple-600 text-xl mb-2" />
                  <h4 className="font-semibold mb-1">24/7 Support</h4>
                  <p className="text-sm text-gray-600">{companyInfo.company.phone}</p>
                  <p className="text-sm text-gray-600">Anytime assistance</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/apartments"
                  className="bg-ghana-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors text-center"
                >
                  Browse More Apartments
                </Link>
                <Link
                  to="/"
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  Back to Home
                </Link>
                <a
                  href={`https://wa.me/${companyInfo.company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <FaWhatsapp />
                  Chat with Host
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ghana-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to={`/apartments/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-ghana-green mb-6 transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to Apartment Details</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Complete Your Booking
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Dates Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaCalendarAlt className="text-ghana-green" />
                    Stay Dates
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        {...register('checkInDate', { required: 'Check-in date is required' })}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={() => setIsAvailable(null)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.checkInDate 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-ghana-green'
                        }`}
                      />
                      {errors.checkInDate && (
                        <p className="mt-1 text-sm text-red-500">{errors.checkInDate.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        {...register('checkOutDate', { 
                          required: 'Check-out date is required',
                          validate: value => {
                            const checkIn = getValues('checkInDate');
                            if (checkIn && value <= checkIn) {
                              return 'Check-out must be after check-in';
                            }
                            return true;
                          }
                        })}
                        min={watchCheckIn || new Date().toISOString().split('T')[0]}
                        onChange={() => setIsAvailable(null)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.checkOutDate 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-ghana-green'
                        }`}
                      />
                      {errors.checkOutDate && (
                        <p className="mt-1 text-sm text-red-500">{errors.checkOutDate.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Availability Check */}
                  {watchCheckIn && watchCheckOut && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleCheckAvailability}
                        disabled={checkingAvailability}
                        className="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        {checkingAvailability ? 'Checking...' : 'Check Availability'}
                      </button>
                      
                      {isAvailable !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-3 p-4 rounded-lg ${
                            isAvailable 
                              ? 'bg-green-50 border border-green-200' 
                              : 'bg-red-50 border border-red-200'
                          }`}
                        >
                          {isAvailable ? (
                            <div className="flex items-center gap-2 text-green-700">
                              <FaCheckCircle />
                              <span>Great! This apartment is available for your selected dates.</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-red-700">
                              <FaTimes />
                              <span>Sorry, this apartment is not available for the selected dates.</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                {/* Guests Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaUsers className="text-ghana-green" />
                    Guests
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-gray-500">Age 13+</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(watchAdults) || 0;
                            if (current > 1) setValue('adults', current - 1);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-ghana-green"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{watchAdults}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(watchAdults) || 0;
                            const max = apartment.maxGuests - (parseInt(watchChildren) || 0);
                            if (current < max) setValue('adults', current + 1);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-ghana-green"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-gray-500">Age 2-12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(watchChildren) || 0;
                            if (current > 0) setValue('children', current - 1);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-ghana-green"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{watchChildren}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(watchChildren) || 0;
                            const max = apartment.maxGuests - (parseInt(watchAdults) || 0);
                            if (current < max) setValue('children', current + 1);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-ghana-green"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Infants</p>
                        <p className="text-sm text-gray-500">Under 2</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(watchInfants) || 0;
                            if (current > 0) setValue('infants', current - 1);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-ghana-green"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{watchInfants}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(watchInfants) || 0;
                            if (current < 3) setValue('infants', current + 1);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-ghana-green"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Maximum {apartment.maxGuests} guests. Infants don't count toward the number of guests.
                  </p>
                </div>

                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaUser className="text-ghana-green" />
                    Your Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register('firstName', { required: 'First name is required' })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.firstName 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-ghana-green'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.lastName 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-ghana-green'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-ghana-green'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.phone 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-ghana-green'
                        }`}
                        placeholder="+233 XX XXX XXXX"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows="3"
                      {...register('specialRequests')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green resize-none"
                      placeholder="Any special requests or requirements..."
                    />
                  </div>
                </div>

                {/* Payment Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaCreditCard className="text-ghana-green" />
                    Payment Method
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        watchPaymentMethod === 'card' 
                          ? 'border-ghana-green bg-ghana-green/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          value="card"
                          {...register('paymentMethod')}
                          className="text-ghana-green focus:ring-ghana-green"
                        />
                        <FaCreditCard className="text-2xl text-gray-600" />
                        <span>Credit Card</span>
                      </label>
                      
                      <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        watchPaymentMethod === 'momo' 
                          ? 'border-ghana-green bg-ghana-green/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          value="momo"
                          {...register('paymentMethod')}
                          className="text-ghana-green focus:ring-ghana-green"
                        />
                        <FaMoneyBillWave className="text-2xl text-gray-600" />
                        <span>Mobile Money</span>
                      </label>
                    </div>
                    
                    {watchPaymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 pt-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            {...register('cardNumber', { 
                              required: 'Card number is required',
                              pattern: {
                                value: /^[0-9]{16}$/,
                                message: 'Invalid card number'
                              }
                            })}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              {...register('cardExpiry', { required: 'Expiry date is required' })}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVC *
                            </label>
                            <input
                              type="text"
                              {...register('cardCvc', { 
                                required: 'CVC is required',
                                pattern: {
                                  value: /^[0-9]{3,4}$/,
                                  message: 'Invalid CVC'
                                }
                              })}
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            {...register('cardName', { required: 'Name on card is required' })}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaLock className="text-green-600" />
                          <span>Your payment information is encrypted and secure</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {watchPaymentMethod === 'momo' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="text-gray-700 mb-2">
                          You will receive a payment prompt on your mobile phone after booking confirmation.
                        </p>
                        <p className="text-sm text-gray-500">
                          Supported: MTN Mobile Money, Vodafone Cash, AirtelTigo Money
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('agreeToTerms', { required: 'You must agree to the terms' })}
                      className="mt-1 text-ghana-green focus:ring-ghana-green"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-ghana-green hover:underline">Terms and Conditions</a> and 
                      <a href="#" className="text-ghana-green hover:underline"> Privacy Policy</a> *
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>
                  )}
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('agreeToPolicy')}
                      className="mt-1 text-ghana-green focus:ring-ghana-green"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-ghana-green hover:underline">Cancellation Policy</a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isAvailable}
                  className="w-full bg-ghana-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Booking
                      <FaChevronRight />
                    </>
                  )}
                </button>
                
                <p className="text-center text-sm text-gray-500">
                  You won't be charged yet. Payment will be processed after confirmation.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Apartment Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apartment Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative h-48">
                  <img 
                    src={apartment.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
                    alt={apartment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{apartment.name}</h3>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <FaMapMarkerAlt className="text-ghana-green text-xs" />
                        {apartment.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="font-semibold">{apartment.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100">
                    <div className="text-center">
                      <FaBed className="text-ghana-green mx-auto mb-1" />
                      <span className="text-xs text-gray-600">{apartment.bedrooms} Beds</span>
                    </div>
                    <div className="text-center">
                      <FaBath className="text-ghana-green mx-auto mb-1" />
                      <span className="text-xs text-gray-600">{apartment.bathrooms} Baths</span>
                    </div>
                    <div className="text-center">
                      <FaRulerCombined className="text-ghana-green mx-auto mb-1" />
                      <span className="text-xs text-gray-600">{apartment.size} {apartment.sizeUnit}</span>
                    </div>
                  </div>
                  
                  {/* Amenities Preview */}
                  <div className="py-3">
                    <div className="flex flex-wrap gap-2">
                      {apartment.amenities?.slice(0, showAllAmenities ? undefined : 4).map((amenityId) => {
                        const Icon = getAmenityIcon(amenityId);
                        return (
                          <div key={amenityId} className="flex items-center gap-1 text-xs text-gray-600">
                            <Icon className="text-ghana-green" />
                            <span>{getAmenityLabel(amenityId)}</span>
                          </div>
                        );
                      })}
                    </div>
                    {apartment.amenities?.length > 4 && (
                      <button
                        type="button"
                        onClick={() => setShowAllAmenities(!showAllAmenities)}
                        className="text-ghana-green text-sm font-medium mt-2 flex items-center gap-1"
                      >
                        {showAllAmenities ? 'Show Less' : `+${apartment.amenities.length - 4} more amenities`}
                        <FaChevronDown className={`text-xs transition-transform ${showAllAmenities ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Price Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="font-bold text-lg mb-4">Price Summary</h3>
                
                {watchCheckIn && watchCheckOut && priceBreakdown.nights > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {formatPrice(priceBreakdown.nightlyRate)} x {priceBreakdown.nights} nights
                      </span>
                      <span className="font-medium">{formatPrice(priceBreakdown.subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span className="font-medium">{formatPrice(priceBreakdown.cleaningFee)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-medium">{formatPrice(priceBreakdown.serviceFee)}</span>
                    </div>
                    
                    {priceBreakdown.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Promo discount</span>
                        <span>-{formatPrice(priceBreakdown.discount)}</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-ghana-green">{formatPrice(priceBreakdown.total)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Select dates to see price breakdown
                  </p>
                )}
                
                {/* Promo Code */}
                <div className="mt-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowPromoCode(!showPromoCode)}
                    className="text-ghana-green font-medium text-sm flex items-center gap-1"
                  >
                    {showPromoCode ? 'Hide promo code' : 'Have a promo code?'}
                    <FaChevronDown className={`text-xs transition-transform ${showPromoCode ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showPromoCode && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-2 mt-3">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter code"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="px-4 py-2 bg-ghana-green text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Try: WELCOME10, STAYLONG, GHANA20
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <FaShieldAlt className="text-ghana-green text-xl mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Secure Booking</p>
                  </div>
                  <div className="text-center">
                    <FaRegCheckCircle className="text-ghana-green text-xl mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Free Cancellation*</p>
                  </div>
                  <div className="text-center">
                    <FaConciergeBell className="text-ghana-green text-xl mx-auto mb-2" />
                    <p className="text-xs text-gray-600">24/7 Support</p>
                  </div>
                  <div className="text-center">
                    <FaHome className="text-ghana-green text-xl mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Verified Host</p>
                  </div>
                </div>
              </motion.div>

              {/* Need Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-ghana-green/5 rounded-2xl p-6 border border-ghana-green/20"
              >
                <h4 className="font-semibold mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Our team is available 24/7 to assist you with your booking.
                </p>
                <div className="space-y-2">
                  <a
                    href={`tel:${companyInfo.company.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-ghana-green"
                  >
                    <FaPhone className="text-ghana-green" />
                    {companyInfo.company.phone}
                  </a>
                  <a
                    href={`https://wa.me/${companyInfo.company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-ghana-green"
                  >
                    <FaWhatsapp className="text-green-500" />
                    Chat on WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;