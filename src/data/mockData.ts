export const mockEvents = [
  {
    id: 'event-majela',
    title: 'MAJELA Live at La Casa De la Veranda',
    description: 'Experience an unforgettable evening of live music with the talented MAJELA, accompanied by special guest Luichi on piano. Join us for an intimate cabaret-style performance featuring beautiful vocals and elegant piano arrangements in our sophisticated restaurant setting.',
    image: '/1.png',
    category: 'Music',
    date: 'Aug 30, 2024',
    time: '8:30 PM',
    location: '5779 SW 8th St, Miami, FL 33144',
    price: 25,
    attendees: 156,
    likes: 234,
    comments: 67,
    eventType: 'restaurant',
    ticketType: 'mixed',
    organizer: {
      id: 'venue-casa-veranda',
      name: 'La Casa De la Veranda',
      type: 'Restaurant & Cabaret',
      avatar: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'image',
    specialFeatures: {
      coverCharge: 25,
      rsvpRequired: true,
      phoneNumbers: ['786-768-9858', '305-456-3814'],
      specialGuest: 'Luichi al piano',
      venue: 'Restaurant & Cabaret',
      dresscode: 'Smart Casual',
      ageRestriction: '21+'
    }
  },
  {
    id: 'event-1',
    title: 'Summer Jazz Festival',
    description: 'Experience the best of jazz music with renowned artists from around the world. Join us for an unforgettable evening under the stars.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    category: 'Music',
    date: 'Dec 15, 2024',
    time: '8:00 PM',
    location: 'Golden Gate Park, SF',
    price: 45,
    attendees: 1243,
    likes: 892,
    comments: 156,
    eventType: 'concert',
    ticketType: 'standard',
    organizer: {
      id: 'venue-1',
      name: 'SF Jazz Club',
      type: 'Music Venue',
      avatar: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'image'
  },
  {
    id: 'event-2',
    title: 'Local Food Market',
    description: 'Discover amazing local cuisine from the best chefs and food trucks in the city. Taste, explore, and enjoy!',
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
    category: 'Food',
    date: 'Dec 18, 2024',
    time: '11:00 AM',
    location: 'Mission District, SF',
    price: 25,
    attendees: 856,
    likes: 634,
    comments: 89,
    eventType: 'restaurant',
    ticketType: 'table',
    organizer: {
      id: 'promoter-1',
      name: 'Bay Area Events',
      type: 'Event Promoter',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'video'
  },
  {
    id: 'event-3',
    title: 'Electronic Music Night',
    description: 'Dance the night away with the hottest DJs spinning the latest electronic beats. VIP packages available!',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    category: 'Nightlife',
    date: 'Dec 20, 2024',
    time: '10:00 PM',
    location: 'The Warfield, SF',
    price: 35,
    attendees: 2156,
    likes: 1834,
    comments: 287,
    eventType: 'nightclub',
    ticketType: 'mixed',
    organizer: {
      id: 'venue-2',
      name: 'Nightclub SF',
      type: 'Nightclub',
      avatar: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'video'
  },
  {
    id: 'event-4',
    title: 'Art Gallery Opening',
    description: 'Join us for the opening of our newest contemporary art exhibition featuring local and international artists.',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg',
    category: 'Art',
    date: 'Dec 22, 2024',
    time: '6:00 PM',
    location: 'SFMOMA, SF',
    price: 20,
    attendees: 467,
    likes: 298,
    comments: 45,
    eventType: 'general',
    ticketType: 'standard',
    organizer: {
      id: 'venue-3',
      name: 'Modern Art Gallery',
      type: 'Art Gallery',
      avatar: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'image'
  },
  {
    id: 'event-5',
    title: 'Local Sports Tournament',
    description: 'Cheer for your favorite local teams in this exciting basketball tournament. Great atmosphere guaranteed!',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
    category: 'Sports',
    date: 'Dec 25, 2024',
    time: '2:00 PM',
    location: 'Chase Center, SF',
    price: 30,
    attendees: 3245,
    likes: 2156,
    comments: 567,
    eventType: 'general',
    ticketType: 'standard',
    organizer: {
      id: 'venue-4',
      name: 'SF Sports Arena',
      type: 'Sports Venue',
      avatar: 'https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'video'
  },
  {
    id: 'event-6',
    title: 'Rooftop Comedy Show',
    description: 'Laugh until your sides hurt with the funniest comedians in the city. Amazing city views included!',
    image: 'https://images.pexels.com/photos/1055613/pexels-photo-1055613.jpeg',
    category: 'Entertainment',
    date: 'Dec 28, 2024',
    time: '8:30 PM',
    location: 'Downtown Rooftop, SF',
    price: 40,
    attendees: 892,
    likes: 756,
    comments: 123,
    eventType: 'general',
    ticketType: 'standard',
    organizer: {
      id: 'venue-5',
      name: 'Comedy Central SF',
      type: 'Comedy Club',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'image'
  },
  {
    id: 'event-7',
    title: 'Exclusive Wine Tasting',
    description: 'An intimate evening of premium wine tasting with expert sommeliers. Limited seating available.',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg',
    category: 'Food',
    date: 'Dec 30, 2024',
    time: '7:00 PM',
    location: 'Napa Valley Restaurant, SF',
    price: 85,
    attendees: 124,
    likes: 267,
    comments: 34,
    eventType: 'restaurant',
    ticketType: 'table',
    organizer: {
      id: 'venue-6',
      name: 'Fine Dining SF',
      type: 'Restaurant',
      avatar: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    type: 'image'
  }
];

export const mockTableLayouts = {
  'event-2': {
    tables: [
      { id: 'T1', type: 'standard', seats: 4, position: { x: 20, y: 30 }, available: true },
      { id: 'T2', type: 'standard', seats: 4, position: { x: 40, y: 30 }, available: true },
      { id: 'T3', type: 'vip', seats: 6, position: { x: 60, y: 30 }, available: false },
      { id: 'T4', type: 'premium', seats: 8, position: { x: 80, y: 30 }, available: true },
    ]
  },
  'event-3': {
    tables: [
      { id: 'VIP1', type: 'premium', seats: 8, position: { x: 15, y: 20 }, available: true },
      { id: 'VIP2', type: 'premium', seats: 8, position: { x: 85, y: 20 }, available: false },
      { id: 'T1', type: 'vip', seats: 6, position: { x: 25, y: 50 }, available: true },
      { id: 'T2', type: 'vip', seats: 6, position: { x: 50, y: 50 }, available: true },
      { id: 'T3', type: 'vip', seats: 6, position: { x: 75, y: 50 }, available: true },
      { id: 'T4', type: 'standard', seats: 4, position: { x: 20, y: 80 }, available: true },
      { id: 'T5', type: 'standard', seats: 4, position: { x: 40, y: 80 }, available: true },
      { id: 'T6', type: 'standard', seats: 4, position: { x: 60, y: 80 }, available: true },
      { id: 'T7', type: 'standard', seats: 4, position: { x: 80, y: 80 }, available: true },
    ]
  },
  'event-majela': {
    tables: [
      { id: 'VIP1', type: 'premium', seats: 6, position: { x: 20, y: 25 }, available: true },
      { id: 'VIP2', type: 'premium', seats: 6, position: { x: 80, y: 25 }, available: true },
      { id: 'T1', type: 'vip', seats: 4, position: { x: 15, y: 50 }, available: true },
      { id: 'T2', type: 'vip', seats: 4, position: { x: 35, y: 50 }, available: false },
      { id: 'T3', type: 'vip', seats: 4, position: { x: 55, y: 50 }, available: true },
      { id: 'T4', type: 'vip', seats: 4, position: { x: 75, y: 50 }, available: true },
      { id: 'T5', type: 'standard', seats: 2, position: { x: 25, y: 75 }, available: true },
      { id: 'T6', type: 'standard', seats: 2, position: { x: 45, y: 75 }, available: true },
      { id: 'T7', type: 'standard', seats: 2, position: { x: 65, y: 75 }, available: true },
    ]
  }
};