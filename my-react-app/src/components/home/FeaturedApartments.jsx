import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import useApartments from '../../hooks/useApartments';
import ApartmentCard from '../apartments/ApartmentCard';

const FeaturedApartments = () => {
  const { apartments, loading } = useApartments();

  // derive data directly (NO state, NO useEffect)
  const featuredApartments = apartments.filter(
    (apt) => apt.featured
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-4">
                <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // EMPTY STATE
  if (!featuredApartments.length) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No featured apartments available at the moment.
          </p>
        </div>
      </section>
    );
  }

  // MAIN UI
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Premium Selection
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-green-600">Apartments</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our hand-picked selection of the finest apartments in Accra's most prestigious locations
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredApartments.map((apartment) => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
            />
          ))}
        </motion.div>

        {/* BUTTON */}
        <div className="text-center mt-12">
          <Link
            to="/apartments"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-all"
          >
            View All Apartments
            <FaArrowRight className="ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedApartments;