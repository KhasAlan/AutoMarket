
export const chatAdvisor = {
  name: 'Julian Vance',
  role: 'Senior Brand Ambassador',
  status: 'Online Now',
  badge: 'VIP VERIFIED',
  image:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
};

export const chatVehicle = {
  id: '1',
  brand: 'Porsche',
  model: '911 Carrera GTS',
  year: 2024,
  price: '$188,000',
  image:
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000',
};

export const initialMessages = [
  {
    id: '1',
    text: 'Welcome to Porsche Beverly Hills. I am Julian, your personal brand ambassador. How may I assist you today?',
    time: '10:42 AM',
    sender: 'advisor' as const,
  },
  {
    id: '2',
    text: 'Hi Julian! I am interested in the 911 Carrera GTS. Is it available for a private viewing?',
    time: '10:44 AM',
    sender: 'user' as const,
  },
  {
    id: '3',
    text: 'Absolutely! The vehicle is available. I would be delighted to arrange a private showroom experience for you.',
    time: '10:45 AM',
    sender: 'advisor' as const,
  },
];

export const quickReplies = [
  'Request Window Sticker',
  'What is trade-in credit?',
];

export const testDriveDetails = {
  title: 'PRIVATE TEST DRIVE',
  vehicle: '2024 Porsche 911 Carrera GTS',
  duration: '45 Minutes',
  route: 'Baku City Experience',
  date: 'November 12, 2026',
  time: '2:30 PM',
};
