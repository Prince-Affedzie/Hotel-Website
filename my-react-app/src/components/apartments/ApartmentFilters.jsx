import React, { useState } from 'react';
import { FaWifi, FaSnowflake, FaParking, FaSwimmingPool, FaDumbbell, FaUtensils, FaTv, FaWind,FaSlidersH } from 'react-icons/fa';
import { MdKitchen, MdBalcony,MdLocalLaundryService, MdPets } from 'react-icons/md';

const ApartmentFilters = ({ filters, onFilterChange, locations }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 1000]);

  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', icon: FaWifi },
    { id: 'ac', label: 'Air Conditioning', icon: FaSnowflake },
    { id: 'kitchen', label: 'Kitchen', icon: MdKitchen },
    { id: 'parking', label: 'Parking', icon: FaParking },
    { id: 'pool', label: 'Swimming Pool', icon: FaSwimmingPool },
    { id: 'gym', label: 'Gym', icon: FaDumbbell },
    { id: 'tv', label: 'TV', icon: FaTv },
    { id: 'balcony', label: 'Balcony', icon: MdBalcony },
    { id: 'laundry', label: 'Laundry', icon: MdLocalLaundryService },
    { id: 'pets', label: 'Pet Friendly', icon: MdPets }
  ];

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ priceRange: value });
  };

  const handleAmenityToggle = (amenityId) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(a => a !== amenityId)
      : [...currentAmenities, amenityId];
    onFilterChange({ amenities: newAmenities });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <FaSlidersH className="text-ghana-green" />
        Filter Apartments
      </h3>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3">Price Range (GHS)</h4>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>₵{priceRange[0]}</span>
            <span>₵{priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-ghana-green"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="px-3 py-2 border rounded-lg text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value) || 1000])}
              className="px-3 py-2 border rounded-lg text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3">Bedrooms</h4>
        <select
          value={filters.bedrooms || 'any'}
          onChange={(e) => onFilterChange({ bedrooms: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
        >
          <option value="any">Any</option>
          <option value="1">1+ Bedroom</option>
          <option value="2">2+ Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>
      </div>

      {/* Location */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3">Location</h4>
        <select
          value={filters.location || ''}
          onChange={(e) => onFilterChange({ location: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ghana-green"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="font-semibold mb-3">Amenities</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {amenitiesList.map((amenity) => {
            const Icon = amenity.icon;
            const isSelected = (filters.amenities || []).includes(amenity.id);
            
            return (
              <label
                key={amenity.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityToggle(amenity.id)}
                  className="w-4 h-4 text-ghana-green rounded focus:ring-ghana-green"
                />
                <Icon className={`text-lg ${isSelected ? 'text-ghana-green' : 'text-gray-400'}`} />
                <span className="text-sm">{amenity.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApartmentFilters;