
export const dealership = {
  id: 'baku-premium',
  name: 'Porsche Center Baku',
  rating: '4.9',
  reviews: 428,
  address: 'Neftchilar Avenue, Baku, Azerbaijan',
  distance: '1.2 mi away',
  verified: true,

  image:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',

  workingHours: {
    status: 'Open Today',
    hours: '9:00 AM – 7:00 PM',
    description: 'Executive Lounge & Private Vault Open',
  },

  amenities: [
    { id: '1', icon: '☕', name: 'VIP Espresso Lounge' },
    { id: '2', icon: '⚡', name: 'Level 3 DC Fast Charging' },
    { id: '3', icon: '🚘', name: 'Complimentary Valet' },
    { id: '4', icon: '✦', name: 'Exclusive Manufacturer Events' },
  ],

  advisor: {
    name: 'Marcus Vance',
    role: 'Senior Brand Ambassador',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    availability: 'Available Now',
  },
};

export const inventoryCategories = [
  'All',
  'Coupe',
  'Sedan',
  'SUV',
];

export const inventoryDetails: Record<
  string,
  {
    badge: string;
    color: string;
    specifications: string[];
    availability: string;
  }
> = {
  '1': {
    badge: 'IN SHOWROOM NOW',
    color: 'Arctic Grey',
    specifications: ['3.0s', '518 HP', '184 mph'],
    availability: 'Immediate Delivery',
  },
  '2': {
    badge: 'FEATURED VEHICLE',
    color: 'Obsidian Black',
    specifications: ['3.9s', '585 HP', '186 mph'],
    availability: 'Available Now',
  },
  '3': {
    badge: '100% ELECTRIC',
    color: 'Mineral White',
    specifications: ['4.5s', '536 HP', '300 mi'],
    availability: 'Certified Pre-Delivery Inspected',
  },
  '4': {
    badge: 'PERFORMANCE SUV',
    color: 'Daytona Grey',
    specifications: ['3.8s', '591 HP', '190 mph'],
    availability: 'Available Now',
  },
  '5': {
    badge: '100% ELECTRIC',
    color: 'Pearl White',
    specifications: ['3.1s', '670 HP', '348 mi'],
    availability: 'Available Now',
  },
  '6': {
    badge: 'EXCLUSIVE COLLECTION',
    color: 'Arancio Borealis',
    specifications: ['2.9s', '631 HP', '202 mph'],
    availability: 'By Appointment',
  },
};
