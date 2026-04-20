import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn,
  FaPaperPlane,
  FaCheckCircle,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaBuilding,
  FaUsers,
  FaHeadset,
  FaCalendarCheck,
  FaArrowRight,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import companyInfo from '../data/companyInfo.json';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('general');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const faqs = [
    {
      id: 1,
      question: "What are your check-in and check-out times?",
      answer: "Check-in is from 3:00 PM to 10:00 PM, and check-out is by 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
    },
    {
      id: 2,
      question: "Do you offer airport pickup services?",
      answer: "Yes, we offer complimentary airport pickup and drop-off services for all our guests. Please provide your flight details at least 24 hours in advance."
    },
    {
      id: 3,
      question: "What is your cancellation policy?",
      answer: "Free cancellation is available up to 48 hours before check-in. Cancellations within 48 hours will be charged the first night's rate. Please review our full policy during booking."
    },
    {
      id: 4,
      question: "Are pets allowed in the apartments?",
      answer: "Pets are allowed in select apartments with prior approval. A pet fee may apply. Please contact us before booking to ensure availability."
    },
    {
      id: 5,
      question: "Do you offer long-term stay discounts?",
      answer: "Yes, we offer special rates for stays of 7 nights or longer. Contact our reservations team for personalized long-term stay packages."
    }
  ];

  const departments = [
    { id: 'general', label: 'General Inquiries', icon: FaQuestionCircle },
    { id: 'reservations', label: 'Reservations', icon: FaCalendarCheck },
    { id: 'corporate', label: 'Corporate Housing', icon: FaBuilding },
    { id: 'support', label: 'Guest Support', icon: FaHeadset }
  ];

  const contactMethods = [
    {
      icon: FaPhone,
      title: "Call Us",
      content: companyInfo.company.phone,
      subContent: "Available 24/7",
      color: "bg-blue-500",
      action: `tel:${companyInfo.company.phone}`
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      content: companyInfo.company.mobile,
      subContent: "Quick Response",
      color: "bg-green-500",
      action: `https://wa.me/${companyInfo.company.whatsapp}`
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      content: companyInfo.company.email,
      subContent: "We'll reply within 2 hours",
      color: "bg-red-500",
      action: `mailto:${companyInfo.company.email}`
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      content: companyInfo.company.address.area,
      subContent: companyInfo.company.address.city,
      color: "bg-purple-500",
      action: `https://maps.google.com/?q=${encodeURIComponent(companyInfo.company.address.street + ' ' + companyInfo.company.address.city)}`
    }
  ];

  const stats = [
    { value: "24/7", label: "Customer Support" },
    { value: "< 2 hrs", label: "Response Time" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "500+", label: "Happy Guests" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-ghana-green to-green-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
              Get in Touch
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We're here to help you find your perfect stay in Accra. 
              Reach out to us anytime - we'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={index}
                  href={method.action}
                  target={method.icon === FaMapMarkerAlt ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`${method.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{method.content}</p>
                  <p className="text-sm text-gray-500">{method.subContent}</p>
                  
                  <div className="mt-4 flex items-center text-ghana-green font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Contact Now</span>
                    <FaArrowRight className="ml-2 text-xs" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {/* Department Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {departments.map((dept) => {
                    const Icon = dept.icon;
                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => setSelectedDepartment(dept.id)}
                        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                          selectedDepartment === dept.id
                            ? 'border-ghana-green bg-ghana-green/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`text-xl mb-1 ${
                          selectedDepartment === dept.id ? 'text-ghana-green' : 'text-gray-400'
                        }`} />
                        <span className="text-xs text-center">{dept.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <div>
                      <p className="font-medium text-green-800">Message Sent Successfully!</p>
                      <p className="text-sm text-green-700">We'll get back to you within 2 hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.subject 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-ghana-green'
                    }`}
                    placeholder="What is this regarding?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows="5"
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-ghana-green'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ghana-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right Column - Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-64 bg-gray-200">
                  <iframe
                    title="Company Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.890123456789!2d-0.123456!3d5.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDcnMjQuNCJOIDDCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Location</h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-start">
                      <FaMapMarkerAlt className="text-ghana-green mt-1 mr-3 flex-shrink-0" />
                      <span>
                        {companyInfo.company.address.street}<br />
                        {companyInfo.company.address.area}<br />
                        {companyInfo.company.address.city}, {companyInfo.company.address.country}
                      </span>
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.company.address.street + ' ' + companyInfo.company.address.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-ghana-green font-medium hover:text-green-800 transition-colors"
                    >
                      Get Directions
                      <FaArrowRight className="ml-2 text-sm" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ghana-green/10 rounded-xl flex items-center justify-center">
                    <FaClock className="text-ghana-green text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  {Object.entries(companyInfo.company.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700 font-medium capitalize">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-ghana-green to-green-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 bg-ghana-green/10 text-ghana-green rounded-full text-sm font-semibold mb-4">
              Got Questions?
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about our apartments and services
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {activeFaq === faq.id ? (
                    <FaChevronUp className="text-ghana-green flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, special offers, and behind-the-scenes content
            </p>
            
            <div className="flex justify-center gap-4">
              <a
                href={companyInfo.company.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-ghana-green transition-all duration-200 hover:scale-110"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href={companyInfo.company.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-ghana-green transition-all duration-200 hover:scale-110"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href={companyInfo.company.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-ghana-green transition-all duration-200 hover:scale-110"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href={companyInfo.company.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-ghana-green transition-all duration-200 hover:scale-110"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for exclusive offers and the latest updates
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ghana-green"
              />
              <button
                type="submit"
                className="bg-ghana-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;