export type BookingType = 'test-drive' | 'showroom';

export type Booking = {
  id: string;
  type: BookingType;
  date: string;
  time: string;
  name: string;
  phone: string;
  email?: string;
  carId?: string;
  carName?: string;
  experience?: string;
  location: string;
  status: 'confirmed';
};