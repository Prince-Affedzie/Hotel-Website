import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaWifi, 
  FaSwimmingPool, 
  FaDumbbell, 
  FaParking, 
  FaSnowflake, 
  FaTv, 
  FaUtensils, 
  FaShieldAlt,
  FaConciergeBell,
  FaSpa,
  FaCar,
  FaCoffee
} from 'react-icons/fa';
import { MdBalcony, MdKitchen, MdLocalLaundryService } from 'react-icons/md';

const AmenitiesSection = () => {
  const amenities = [
    {
      icon: FaWifi,
      title: "High-Speed WiFi",
      description: "Complimentary fiber-optic internet throughout the property",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaSwimmingPool,
      title: "Infinity Pool",
      description: "Stunning rooftop pool with panoramic Accra views",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: FaDumbbell,
      title: "Fitness Center",
      description: "24/7 access to modern gym equipment and yoga studio",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: FaParking,
      title: "Secure Parking",
      description: "Underground parking with 24/7 CCTV surveillance",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: FaSnowflake,
      title: "Air Conditioning",
      description: "Individual climate control in every room",
      color: "from-sky-400 to-blue-500"
    },
    {
      icon: MdKitchen,
      title: "Full Kitchen",
      description: "Modern appliances and complete cooking facilities",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: FaShieldAlt,
      title: "24/7 Security",
      description: "Round-the-clock security personnel and CCTV monitoring",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: FaConciergeBell,
      title: "Concierge Service",
      description: "Personalized assistance for all your needs",
      color: "from-yellow-500 to-amber-600"
    },
    {
      icon: FaSpa,
      title: "Spa & Wellness",
      description: "Relaxing treatments and massage services available",
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: MdBalcony,
      title: "Private Balcony",
      description: "Enjoy city or ocean views from your private space",
      color: "from-teal-400 to-green-500"
    },
    {
      icon: FaCar,
      title: "Airport Shuttle",
      description: "Complimentary pickup and drop-off service",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: FaCoffee,
      title: "Breakfast Service",
      description: "Daily continental breakfast with local specialties",
      color: "from-yellow-600 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-ghana-yellow/20 text-gray-800 rounded-full text-sm font-semibold mb-4">
            World-Class Facilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Exceptional <span className="text-ghana-green">Amenities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience unparalleled comfort with our comprehensive range of premium amenities 
            designed for your perfect stay
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-ghana-green/5 to-ghana-yellow/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Container */}
                <div className={`relative mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${amenity.color} p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-gray-900 mb-2 group-hover:text-ghana-green transition-colors">
                  {amenity.title}
                </h3>
                <p className="relative text-gray-600 leading-relaxed">
                  {amenity.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ghana-green via-ghana-yellow to-ghana-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-ghana-green to-green-800 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                More Than Just an Apartment
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Every stay includes access to our exclusive member benefits, 
                including local experiences, dining discounts, and personalized 
                concierge services to make your Ghana visit unforgettable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">₵0</div>
                <div className="text-sm text-white/80">Booking Fees</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">24h</div>
                <div className="text-sm text-white/80">Check-in Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">Free</div>
                <div className="text-sm text-white/80">Cancellation*</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-white/80">Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmenitiesSection;