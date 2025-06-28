import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Clock, Users, Share, Heart, Ticket, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EventModalProps {
  event: any;
  onClose: () => void;
  user: any;
  onAuthRequired: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ 
  event, 
  onClose, 
  user, 
  onAuthRequired 
}) => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(0);
  const [selectedTableType, setSelectedTableType] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'ticket' | 'table'>('ticket');
  const { likedEvents, toggleLike, followedProfiles, toggleFollow } = useApp();
  
  const isLiked = likedEvents.includes(event.id);
  const isFollowing = followedProfiles.includes(event.organizer.id);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Enhanced ticket types with table options
  const ticketTypes = [
    { name: 'General Admission', price: event.price, description: 'Standard entry', capacity: 200 },
    { name: 'VIP Access', price: event.price * 2, description: 'Premium experience with perks', capacity: 50 },
    { name: 'Early Bird', price: event.price * 0.8, description: 'Limited time offer', capacity: 100 }
  ];

  const tableTypes = [
    { 
      name: 'Standard Table', 
      price: event.price * 4, 
      seats: 4, 
      description: 'Perfect for small groups',
      amenities: ['Reserved seating', 'Table service'],
      available: 12
    },
    { 
      name: 'VIP Table', 
      price: event.price * 8, 
      seats: 6, 
      description: 'Premium location with bottle service',
      amenities: ['Premium location', 'Bottle service', 'Dedicated server', 'VIP entrance'],
      available: 6
    },
    { 
      name: 'Premium Booth', 
      price: event.price * 12, 
      seats: 8, 
      description: 'Exclusive booth with full service',
      amenities: ['Private booth', 'Full bottle service', 'Personal host', 'VIP parking'],
      available: 3
    }
  ];

  const handlePurchase = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    setShowTicketModal(true);
  };

  const handleCheckout = () => {
    const item = purchaseType === 'ticket' ? ticketTypes[selectedTicketType] : tableTypes[selectedTableType];
    const total = item.price * quantity;
    
    if (purchaseType === 'table') {
      alert(`Successfully reserved ${quantity} ${item.name}(s) for ${event.title}! Total: $${total}`);
    } else {
      alert(`Successfully purchased ${quantity} ticket(s) for ${event.title}! Total: $${total}`);
    }
    
    setShowTicketModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Main Event Modal - Fixed size, no scrolling */}
      <div className="w-full max-w-4xl h-[90vh] bg-black rounded-2xl overflow-hidden flex">
        {/* Left side - Event Image */}
        <div 
          className="flex-1 relative"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url(${event.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
          >
            <X size={24} />
          </button>

          {/* Event title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex items-center space-x-2">
              <img
                src={event.organizer.avatar}
                alt={event.organizer.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white font-medium">{event.organizer.name}</span>
              <button
                onClick={() => toggleFollow(event.organizer.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isFollowing
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Event Details */}
        <div className="w-96 bg-gray-900 flex flex-col">
          {/* Header with like button */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Event Details</h2>
              <p className="text-gray-400 text-sm">Everything you need to know</p>
            </div>
            <button
              onClick={() => toggleLike(event.id)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Event Info Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-400" size={20} />
                <div>
                  <p className="text-white font-medium">{event.date}</p>
                  <p className="text-gray-400 text-sm">Date</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="text-purple-400" size={20} />
                <div>
                  <p className="text-white font-medium">{event.time}</p>
                  <p className="text-gray-400 text-sm">Time</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="text-purple-400" size={20} />
                <div>
                  <p className="text-white font-medium text-sm">{event.location}</p>
                  <p className="text-gray-400 text-sm">Location</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="text-purple-400" size={20} />
                <div>
                  <p className="text-white font-medium">{event.attendees} going</p>
                  <p className="text-gray-400 text-sm">Attendees</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About This Event</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{event.description}</p>
            </div>

            {/* Attendees Preview */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Who's Going</h3>
              <div className="flex -space-x-2">
                {[...Array(6)].map((_, i) => (
                  <img
                    key={i}
                    src={`https://images.pexels.com/photos/${1040880 + i}/pexels-photo-${1040880 + i}.jpeg?w=100&h=100&fit=crop&crop=face`}
                    alt="Attendee"
                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                  />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-white text-xs font-medium">
                  +{event.attendees - 6}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed bottom purchase section */}
          <div className="p-6 border-t border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Get Your Tickets</h3>
                <p className="text-gray-400 text-sm">Starting from ${event.price}</p>
              </div>
              <Ticket className="text-purple-400" size={24} />
            </div>
            
            <button
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform"
            >
              Buy Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Floating Ticket Purchase Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-70 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">Select Options</h2>
                <p className="text-gray-400 text-sm mt-1">{event.title}</p>
              </div>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Purchase Type Toggle */}
              <div className="flex bg-gray-800 rounded-xl p-1 mb-4">
                <button
                  onClick={() => setPurchaseType('ticket')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all text-sm ${
                    purchaseType === 'ticket'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Individual Tickets
                </button>
                <button
                  onClick={() => setPurchaseType('table')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all text-sm ${
                    purchaseType === 'table'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Table Reservations
                </button>
              </div>

              {/* Table Layout for table bookings */}
              {purchaseType === 'table' && (
                <div className="bg-gray-800 rounded-xl p-3 mb-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">Venue Layout</h3>
                  <div className="relative bg-gray-900 rounded-lg p-3 h-32">
                    {/* Stage */}
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-purple-600 rounded px-2 py-1">
                      <span className="text-white text-xs font-medium">STAGE</span>
                    </div>
                    
                    {/* Tables */}
                    <div className="grid grid-cols-4 gap-1 mt-6 h-20">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`rounded border flex items-center justify-center text-xs font-medium ${
                            i < 3 ? 'border-red-500 bg-red-500/20 text-red-300' : 
                            i < 9 ? 'border-yellow-500 bg-yellow-500/20 text-yellow-300' :
                            'border-green-500 bg-green-500/20 text-green-300'
                          }`}
                        >
                          T{i + 1}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 border border-red-500 bg-red-500/20 rounded"></div>
                        <span className="text-gray-400">Premium</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 border border-yellow-500 bg-yellow-500/20 rounded"></div>
                        <span className="text-gray-400">VIP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 border border-green-500 bg-green-500/20 rounded"></div>
                        <span className="text-gray-400">Standard</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3 mb-4">
                {(purchaseType === 'ticket' ? ticketTypes : tableTypes).map((option, index) => (
                  <div
                    key={index}
                    onClick={() => purchaseType === 'ticket' ? setSelectedTicketType(index) : setSelectedTableType(index)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                      (purchaseType === 'ticket' ? selectedTicketType : selectedTableType) === index
                        ? 'border-purple-500 bg-purple-500/10 shadow-lg'
                        : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold text-sm">{option.name}</h3>
                          <div className="text-right">
                            <p className="text-white font-bold">${option.price}</p>
                            {purchaseType === 'table' && (
                              <p className="text-gray-400 text-xs">{option.seats} seats</p>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs mb-1">{option.description}</p>
                        
                        {purchaseType === 'table' && 'amenities' in option && (
                          <div className="flex flex-wrap gap-1 mb-1">
                            {option.amenities.map((amenity, i) => (
                              <span key={i} className="bg-gray-700 text-gray-300 px-1 py-0.5 rounded text-xs">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-green-400 text-xs">
                          {purchaseType === 'ticket' 
                            ? `${option.capacity} available` 
                            : `${option.available} tables available`
                          }
                        </p>
                        
                        {(purchaseType === 'ticket' ? selectedTicketType : selectedTableType) === index && (
                          <div className="flex items-center mt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuantity(Math.max(1, quantity - 1));
                              }}
                              className="w-8 h-8 bg-gray-700 rounded-l-lg flex items-center justify-center text-white hover:bg-gray-600 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="w-12 h-8 bg-gray-800 flex items-center justify-center text-white font-medium border-t border-b border-gray-700 text-sm">
                              {quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuantity(quantity + 1);
                              }}
                              className="w-8 h-8 bg-gray-700 rounded-r-lg flex items-center justify-center text-white hover:bg-gray-600 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800 p-4 flex-shrink-0">
              {/* Total */}
              <div className="bg-gray-800 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <span className="font-medium text-sm">
                      Total ({quantity} {purchaseType === 'table' ? 'table' : 'ticket'}{quantity > 1 ? 's' : ''})
                    </span>
                    {purchaseType === 'table' && (
                      <span className="text-gray-400 text-xs block">
                        {tableTypes[selectedTableType].seats * quantity} total seats
                      </span>
                    )}
                  </div>
                  <span className="text-xl font-bold text-purple-400">
                    ${((purchaseType === 'ticket' ? ticketTypes[selectedTicketType] : tableTypes[selectedTableType]).price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-lg"
              >
                {purchaseType === 'table' ? 'Reserve Table' : 'Complete Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};