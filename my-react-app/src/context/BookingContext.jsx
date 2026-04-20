import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initialState = {
  selectedApartment: null,
  checkInDate: null,
  checkOutDate: null,
  guests: 1,
  totalPrice: 0,
  customerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  }
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_APARTMENT':
      return { ...state, selectedApartment: action.payload };
    
    case 'SET_DATES':
      return {
        ...state,
        checkInDate: action.payload.checkIn,
        checkOutDate: action.payload.checkOut
      };
    
    case 'SET_GUESTS':
      return { ...state, guests: action.payload };
    
    case 'SET_CUSTOMER_INFO':
      return {
        ...state,
        customerInfo: { ...state.customerInfo, ...action.payload }
      };
    
    case 'CALCULATE_TOTAL':
      if (!state.selectedApartment || !state.checkInDate || !state.checkOutDate) {
        return state;
      }
      const nights = calculateNights(state.checkInDate, state.checkOutDate);
      const total = nights * state.selectedApartment.price;
      return { ...state, totalPrice: total };
    
    case 'RESET_BOOKING':
      return initialState;
    
    default:
      return state;
  }
};

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};