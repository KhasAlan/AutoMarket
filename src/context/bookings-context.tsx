import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { Booking } from '../types/booking';

type BookingsContextType = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
};

const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined
);

export function BookingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Booking) => {
    setBookings((current) => [booking, ...current]);
  };

  const removeBooking = (id: string) => {
    setBookings((current) =>
      current.filter((booking) => booking.id !== id)
    );
  };

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);

  if (!context) {
    throw new Error('useBookings must be used inside BookingsProvider');
  }

  return context;
}