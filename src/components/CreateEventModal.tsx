import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, DollarSign, Users, Image, Video, Music, Utensils, Palette, Gamepad2, Camera, Upload } from 'lucide-react';

interface CreateEventModalProps {
  onClose: () => void;
  user: any;
  onAuthRequired: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ 
  onClose, 
  user, 
  onAuthRequired 
}) => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    venue: '',
    image: '',
    eventType: 'general', // general, restaurant, nightclub, concert
    ticketType: 'standard', // standard, table, vip, mixed
    capacity: '',
    ticketTiers: [
      { name: 'General Admission', price: '', capacity: '', description: '' }
    ],
    tableTiers: [
      { name: 'Standard Table', price: '', seats: 4, description: 'Perfect for small groups' }
    ],
    amenities: [],
    ageRestriction: '18+',
    dresscode: '',
    specialInstructions: ''
  });

  if (!user) {
    onAuthRequired();
    return null;
  }

  const eventTypes = [
    { id: 'general', name: 'General Event', icon: Calendar, description: 'Standard event with regular seating' },
    { id: 'restaurant', name: 'Restaurant Event', icon: Utensils, description: 'Dining experience with table reservations' },
    { id: 'nightclub', name: 'Nightclub Event', icon: Music, description: 'Party with VIP tables and bottle service' },
    { id: 'concert', name: 'Concert/Show', icon: Music, description: 'Live performance with tiered seating' }
  ];

  const categories = [
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'food', name: 'Food & Drink', icon: '🍽️' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
    { id: 'art', name: 'Art & Culture', icon: '🎨' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'business', name: 'Business', icon: '💼' }
  ];

  const addTicketTier = () => {
    setEventData({
      ...eventData,
      ticketTiers: [...eventData.ticketTiers, { name: '', price: '', capacity: '', description: '' }]
    });
  };

  const addTableTier = () => {
    setEventData({
      ...eventData,
      tableTiers: [...eventData.tableTiers, { name: '', price: '', seats: 4, description: '' }]
    });
  };

  const updateTicketTier = (index: number, field: string, value: string) => {
    const updated = eventData.ticketTiers.map((tier, i) => 
      i === index ? { ...tier, [field]: value } : tier
    );
    setEventData({ ...eventData, ticketTiers: updated });
  };

  const updateTableTier = (index: number, field: string, value: string | number) => {
    const updated = eventData.tableTiers.map((tier, i) => 
      i === index ? { ...tier, [field]: value } : tier
    );
    setEventData({ ...eventData, tableTiers: updated });
  };

  const handleSubmit = () => {
    // Simulate event creation
    alert('Event created successfully! It will be reviewed and published shortly.');
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Create New Event</h2>
        <p className="text-gray-400">Let's start with the basics</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Event Title</label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            placeholder="Enter event title..."
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Description</label>
          <textarea
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            placeholder="Describe your event..."
            rows={4}
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setEventData({ ...eventData, category: category.id })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  eventData.category === category.id
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="text-2xl mb-2 block">{category.icon}</span>
                <span className="text-white text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Date</label>
            <input
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Time</label>
            <input
              type="time"
              value={eventData.time}
              onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Location</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
            placeholder="Enter venue address..."
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Event Type</h2>
        <p className="text-gray-400">Choose how your event will be structured</p>
      </div>

      <div className="space-y-3">
        {eventTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setEventData({ ...eventData, eventType: type.id })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                eventData.eventType === type.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className="text-purple-400" size={24} />
                <div>
                  <h3 className="text-white font-semibold">{type.name}</h3>
                  <p className="text-gray-400 text-sm">{type.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Ticket Type</label>
        <div className="space-y-2">
          <button
            onClick={() => setEventData({ ...eventData, ticketType: 'standard' })}
            className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
              eventData.ticketType === 'standard'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <span className="text-white font-medium">Standard Tickets</span>
            <p className="text-gray-400 text-sm">Individual ticket sales</p>
          </button>
          
          <button
            onClick={() => setEventData({ ...eventData, ticketType: 'table' })}
            className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
              eventData.ticketType === 'table'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <span className="text-white font-medium">Table Reservations</span>
            <p className="text-gray-400 text-sm">Book entire tables with seating</p>
          </button>
          
          <button
            onClick={() => setEventData({ ...eventData, ticketType: 'mixed' })}
            className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
              eventData.ticketType === 'mixed'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <span className="text-white font-medium">Mixed Options</span>
            <p className="text-gray-400 text-sm">Both individual tickets and tables</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pricing & Capacity</h2>
        <p className="text-gray-400">Set up your ticketing options</p>
      </div>

      {(eventData.ticketType === 'standard' || eventData.ticketType === 'mixed') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Ticket Tiers</h3>
            <button
              onClick={addTicketTier}
              className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-600 transition-colors"
            >
              Add Tier
            </button>
          </div>
          
          <div className="space-y-4">
            {eventData.ticketTiers.map((tier, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Tier name (e.g., General Admission)"
                    value={tier.name}
                    onChange={(e) => updateTicketTier(index, 'name', e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    placeholder="Price ($)"
                    value={tier.price}
                    onChange={(e) => updateTicketTier(index, 'price', e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Capacity"
                  value={tier.capacity}
                  onChange={(e) => updateTicketTier(index, 'capacity', e.target.value)}
                  className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={tier.description}
                  onChange={(e) => updateTicketTier(index, 'description', e.target.value)}
                  className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {(eventData.ticketType === 'table' || eventData.ticketType === 'mixed') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Table Options</h3>
            <button
              onClick={addTableTier}
              className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-600 transition-colors"
            >
              Add Table Type
            </button>
          </div>
          
          <div className="space-y-4">
            {eventData.tableTiers.map((table, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Table type (e.g., VIP Table)"
                    value={table.name}
                    onChange={(e) => updateTableTier(index, 'name', e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    placeholder="Price ($)"
                    value={table.price}
                    onChange={(e) => updateTableTier(index, 'price', e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Seats per table"
                    value={table.seats}
                    onChange={(e) => updateTableTier(index, 'seats', parseInt(e.target.value))}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={table.description}
                    onChange={(e) => updateTableTier(index, 'description', e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Final Details</h2>
        <p className="text-gray-400">Add finishing touches to your event</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Event Image</label>
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-gray-500 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400">Click to upload event image</p>
            <p className="text-gray-500 text-sm">JPG, PNG up to 10MB</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Age Restriction</label>
            <select
              value={eventData.ageRestriction}
              onChange={(e) => setEventData({ ...eventData, ageRestriction: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Ages</option>
              <option value="18+">18+</option>
              <option value="21+">21+</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Dress Code</label>
            <input
              type="text"
              value={eventData.dresscode}
              onChange={(e) => setEventData({ ...eventData, dresscode: e.target.value })}
              placeholder="e.g., Smart casual"
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Special Instructions</label>
          <textarea
            value={eventData.specialInstructions}
            onChange={(e) => setEventData({ ...eventData, specialInstructions: e.target.value })}
            placeholder="Any special instructions for attendees..."
            rows={3}
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-gray-900 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-white">Step {step} of 4</h1>
                  <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
              )}
              
              <div className="ml-auto">
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-transform"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-transform"
                  >
                    Create Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};