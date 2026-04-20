import { useState, useEffect, } from 'react';
import apartmentsData from '../data/apartments.json';

const useApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aptLoading,setaptLoading] = useState(false);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setApartments(apartmentsData.apartments);
      } catch (err) {
        setError('Failed to load apartments');
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  const getApartmentById = (id) => {
    return apartments.find(apt => apt.id === id);
  };

  const getFeaturedApartments = () => {
    return apartments.filter(apt => apt.featured);
  };

  const filterApartments = (filters) => {
    return apartments.filter(apt => {
      // Price filter
      if (filters.priceRange) {
        if (apt.price < filters.priceRange[0] || apt.price > filters.priceRange[1]) {
          return false;
        }
      }
      
      // Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        if (apt.bedrooms < parseInt(filters.bedrooms)) return false;
      }
      
      // Location filter
      if (filters.location && filters.location !== '') {
        if (!apt.location.includes(filters.location)) return false;
      }
      
      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          apt.amenities && apt.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      
      return true;
    });
  };

  const checkAvailability = (apartmentId, startDate, endDate) => {
    const apartment = getApartmentById(apartmentId);
    if (!apartment) return false;
    
    const bookedDates = apartment.availability?.bookedDates || [];
    const requestedDates = getDatesInRange(startDate, endDate);
    
    return !requestedDates.some(date => bookedDates.includes(date));
  };

  const getDatesInRange = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);
    
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  return {
    apartments,
    loading,
    error,
    getApartmentById,
    getFeaturedApartments,
    filterApartments,
    checkAvailability
  };
};

export default useApartments;