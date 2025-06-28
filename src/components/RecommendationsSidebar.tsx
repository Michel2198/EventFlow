import React from 'react';
import { TrendingUp, MapPin, Calendar, Users, Star } from 'lucide-react';
import { mockEvents } from '../data/mockData';

interface RecommendationsSidebarProps {
  onEventSelect: (event: any) => void;
}

export const RecommendationsSidebar: React.FC<RecommendationsSidebarProps> = ({ onEventSelect }) => {
  const trendingEvents = mockEvents.slice(0, 4);
  const upcomingEvents = mockEvents.slice(2, 6);

  return (
    <div className="h-full overflow-y-auto p-4 xl:p-6 space-y-6 xl:space-y-8">
      {/* Trending Events */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="text-purple-400" size={20} />
          <h2 className="text-lg xl:text-xl font-semibold text-white">Trending Events</h2>
        </div>
        
        <div className="space-y-3">
          {trendingEvents.map((event, index) => (
            <div
              key={event.id}
              onClick={() => onEventSelect(event)}
              className="bg-gray-900 rounded-lg p-3 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex space-x-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-xs mb-1">
                    <Calendar size={12} className="mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-semibold text-sm">
                      ${event.price}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Users size={12} className="mr-1" />
                      {event.attendees}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming This Week */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="text-green-400" size={20} />
          <h2 className="text-lg xl:text-xl font-semibold text-white">This Week</h2>
        </div>
        
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => onEventSelect(event)}
              className="bg-gray-900 rounded-lg p-3 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex space-x-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm line-clamp-1 mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-xs mb-1">
                    <MapPin size={12} className="mr-1" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-semibold text-xs">
                      ${event.price}
                    </span>
                    <div className="flex items-center text-yellow-400 text-xs">
                      <Star size={12} className="mr-1" />
                      4.8
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Venues */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="text-blue-400" size={20} />
          <h2 className="text-lg xl:text-xl font-semibold text-white">Popular Venues</h2>
        </div>
        
        <div className="space-y-3">
          {mockEvents.slice(0, 3).map((event) => (
            <div
              key={event.organizer.id}
              className="bg-gray-900 rounded-lg p-3 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm truncate">
                    {event.organizer.name}
                  </h3>
                  <p className="text-gray-400 text-xs truncate">
                    {event.organizer.type}
                  </p>
                </div>
                <button className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs hover:bg-purple-600 transition-colors flex-shrink-0">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4">
        <div className="text-gray-500 text-xs space-y-2">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Help</a>
            <a href="#" className="hover:text-gray-400">Terms</a>
            <a href="#" className="hover:text-gray-400">Privacy</a>
          </div>
          <p>© 2024 EventFlow</p>
        </div>
      </div>
    </div>
  );
};