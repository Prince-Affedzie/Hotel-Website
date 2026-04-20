import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaStar, 
  FaHeart, 
  FaShieldAlt, 
  FaClock, 
  FaUsers, 
  FaAward, 
  FaHandshake, 
  FaLeaf, 
  FaHome, 
  FaCheckCircle,
  FaQuoteRight,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaBuilding,
  FaKey,
  FaSmile,
  FaChartLine,
  FaGlobe
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import companyInfo from '../data/companyInfo.json';

const AboutPage = () => {
  const [stats, setStats] = useState([
    { id: 1, value: 0, target: 8, label: 'Years of Excellence', icon: FaAward, suffix: '+' },
    { id: 2, value: 0, target: 50, label: 'Luxury Apartments', icon: FaBuilding, suffix: '+' },
    { id: 3, value: 0, target: 5000, label: 'Happy Guests', icon: FaSmile, suffix: '+' },
    { id: 4, value: 0, target: 98, label: 'Satisfaction Rate', icon: FaChartLine, suffix: '%' }
  ]);

  const [counted, setCounted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView && !counted) {
      setCounted(true);
      stats.forEach(stat => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            setStats(prev => prev.map(s => 
              s.id === stat.id ? { ...s, value: stat.target } : s
            ));
            clearInterval(timer);
          } else {
            setStats(prev => prev.map(s => 
              s.id === stat.id ? { ...s, value: Math.floor(current) } : s
            ));
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      });
    }
  }, [inView, counted]);

  const values = [
    {
      icon: FaHeart,
      title: "Exceptional Hospitality",
      description: "We treat every guest like family, ensuring your stay is comfortable and memorable.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: FaShieldAlt,
      title: "Safety & Security",
      description: "24/7 security, CCTV surveillance, and secure access systems for your peace of mind.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: FaLeaf,
      title: "Sustainability",
      description: "Committed to eco-friendly practices and supporting local communities.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FaHandshake,
      title: "Integrity & Trust",
      description: "Transparent pricing and honest communication in everything we do.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const team = [
    {
      name: "Kwame Asante",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "With over 15 years in hospitality, Kwame founded Ghana Luxury Apartments to redefine premium accommodation in Accra.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Akua Mensah",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616c77216a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Akua ensures every property meets our exacting standards and that guests receive exceptional service.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Kofi Addo",
      role: "Guest Relations Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Kofi and his team are dedicated to making your stay perfect, from booking to checkout.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Efua Donkor",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Efua maintains our properties to the highest standards, ensuring comfort and luxury.",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  const milestones = [
    { year: "2016", title: "Company Founded", description: "Started with 3 apartments in Airport Residential" },
    { year: "2018", title: "Expanded to 20 Properties", description: "Added properties in Labone and Cantonments" },
    { year: "2020", title: "Luxury Collection Launch", description: "Introduced premium penthouse suites" },
    { year: "2022", title: "50+ Properties Milestone", description: "Became Accra's leading luxury apartment provider" },
    { year: "2024", title: "International Recognition", description: "Awarded Best Serviced Apartments in West Africa" }
  ];

  const partners = [
    { name: "Ghana Tourism Authority", logo: null },
    { name: "Accra City Hotel Association", logo: null },
    { name: "Kotoka International Airport", logo: null },
    { name: "Ghana Investment Promotion Centre", logo: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-ghana-green to-green-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
              Our Story
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              About Ghana Luxury Apartments
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Redefining premium accommodation in Accra with exceptional service, 
              luxurious properties, and authentic Ghanaian hospitality.
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 50C480 40 600 50 720 60C840 70 960 80 1080 75C1200 70 1320 50 1380 40L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-ghana-green font-semibold text-lg mb-4 block">
                Welcome to Rasph Luxury Apartments
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Home Away From Home in 
                <span className="text-ghana-green"> Accra</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2016, Rasph Apartments has grown from a small collection 
                  of three apartments to become Accra's premier provider of luxury serviced 
                  accommodation. Our journey began with a simple vision: to offer discerning 
                  travelers and business executives a superior alternative to traditional hotels.
                </p>
                <p>
                  Today, we proudly manage over 50 carefully curated apartments across Accra's 
                  most desirable neighborhoods, including Airport Residential, Labone, Cantonments, 
                  and East Legon. Each property is selected for its prime location, exceptional 
                  quality, and unique character.
                </p>
                <p>
                  What sets us apart is our unwavering commitment to excellence. From the moment 
                  you book until long after you depart, our dedicated team ensures every aspect 
                  of your stay exceeds expectations. We don't just provide accommodation – we 
                  create memorable experiences that keep our guests returning time and time again.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-ghana-green text-xl" />
                  <span className="text-gray-700">Premium Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-ghana-green text-xl" />
                  <span className="text-gray-700">24/7 Concierge</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-ghana-green text-xl" />
                  <span className="text-gray-700">Fully Furnished</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-ghana-green text-xl" />
                  <span className="text-gray-700">Secure Parking</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury Apartment"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-ghana-green/10 rounded-full flex items-center justify-center">
                    <FaStar className="text-ghana-green text-xl" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-gray-900">4.9</div>
                    <div className="text-sm text-gray-600">Guest Rating</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  "Exceptional service and beautiful apartments. Our go-to place in Accra!"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Counter */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Growing stronger every year</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-ghana-green to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="text-white text-3xl" />
                  </div>
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-ghana-green/10 text-ghana-green rounded-full text-sm font-semibold mb-4">
              What Drives Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, ensuring exceptional experiences for every guest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-ghana-green/10 text-ghana-green rounded-full text-sm font-semibold mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming Accra's leading luxury apartment provider
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-ghana-green via-ghana-yellow to-ghana-red" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
                      <div className="text-3xl font-bold text-ghana-green mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-ghana-green rounded-full border-4 border-white shadow-lg" />
                  
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-ghana-green/10 text-ghana-green rounded-full text-sm font-semibold mb-4">
              Our People
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to making your stay exceptional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={member.social.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-ghana-green hover:text-white transition-colors">
                      <FaLinkedinIn />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-ghana-green hover:text-white transition-colors">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-ghana-green font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-ghana-green to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <FaQuoteRight className="text-6xl text-white/30 mx-auto mb-6" />
            <p className="text-2xl lg:text-3xl font-light leading-relaxed mb-8">
              "Rasph Apartments has completely transformed what it means to stay in Accra. 
              Their attention to detail, exceptional service, and beautiful properties make every 
              visit feel like coming home."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">JD</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">James Donkor</p>
                <p className="text-white/80">CEO, African Business Solutions</p>
              </div>
            </div>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-ghana-yellow" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-gray-600">Working together to provide exceptional experiences</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="h-16 flex items-center justify-center">
                  <FaBuilding className="text-4xl text-gray-400" />
                </div>
                <p className="font-medium text-gray-700 mt-3">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Experience Luxury Living?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover our collection of premium apartments and book your perfect stay in Accra today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apartments"
                className="bg-ghana-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                Browse Apartments
                <FaArrowRight />
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;