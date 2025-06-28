import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, Filter, MapPin, Calendar, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCard } from './EventCard';
import { mockEvents } from '../data/mockData';

interface SearchProps {
  onEventSelect: (event: any) => void;
}

export const Search: React.FC<SearchProps> = ({ onEventSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  
  const categoriesRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });

  const categories = [
    { id: 'all', name: 'All', icon: '🎉' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'comedy', name: 'Comedy', icon: '😂' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'tech', name: 'Tech', icon: '💻' }
  ];

  const trendingSearches = [
    'Jazz concerts',
    'Food festivals',
    'Rooftop parties',
    'Art galleries',
    'Wine tasting',
    'Live music'
  ];

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll categories container
  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = categoriesRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      categoriesRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoriesRef.current) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX,
      scrollLeft: categoriesRef.current.scrollLeft
    };
    
    // Prevent text selection
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoriesRef.current) return;
    
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - dragStartRef.current.x) * 2; // Multiply for faster scroll
    categoriesRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!categoriesRef.current) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      x: touch.pageX,
      scrollLeft: categoriesRef.current.scrollLeft
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !categoriesRef.current) return;
    
    const touch = e.touches[0];
    const x = touch.pageX;
    const walk = (x - dragStartRef.current.x) * 2;
    categoriesRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Global mouse event listeners for drag
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !categoriesRef.current) return;
      
      e.preventDefault();
      const x = e.pageX;
      const walk = (x - dragStartRef.current.x) * 2;
      categoriesRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    
    const handleResize = () => {
      checkScrollPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockEvents.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredEvents(mockEvents);
    } else {
      const filtered = mockEvents.filter(event => 
        event.category.toLowerCase() === categoryId.toLowerCase()
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-lg border-b border-gray-800 p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div className="max-w-[600px] mx-auto">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h1 className="text-xl lg:text-2xl font-bold text-white">Discover Events</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4 lg:mb-6">
            <SearchIcon className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events, venues, or locations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-gray-900 text-white placeholder-gray-400 rounded-full py-3 lg:py-4 pl-12 lg:pl-14 pr-4 lg:pr-6 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Categories with Horizontal Scroll and Arrows */}
          <div className="relative mb-4 lg:mb-6">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/90 transition-colors shadow-lg"
                style={{ marginLeft: '-12px' }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {/* Right Arrow */}
            {showRightArrow && (
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/90 transition-colors shadow-lg"
                style={{ marginRight: '-12px' }}
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Categories Container */}
            <div
              ref={categoriesRef}
              className={`flex space-x-2 lg:space-x-3 overflow-x-auto scrollbar-hide pb-2 ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
              onScroll={checkScrollPosition}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                userSelect: isDragging ? 'none' : 'auto'
              }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`flex-shrink-0 px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex space-x-3 lg:space-x-4 overflow-x-auto">
            <button className="flex-shrink-0 flex items-center space-x-2 bg-gray-800 px-3 lg:px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              <MapPin size={16} lg:size={18} />
              <span>Near me</span>
            </button>
            <button className="flex-shrink-0 flex items-center space-x-2 bg-gray-800 px-3 lg:px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              <Calendar size={16} lg:size={18} />
              <span>This week</span>
            </button>
            <button className="flex-shrink-0 flex items-center space-x-2 bg-gray-800 px-3 lg:px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              <Filter size={16} lg:size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6">
        <div className="max-w-[600px] mx-auto">
          {searchQuery === '' ? (
            <div className="space-y-6 lg:space-y-8">
              {/* Trending Searches */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="text-purple-400" size={20} lg:size={24} />
                  <h2 className="text-lg lg:text-xl font-semibold text-white">Trending Searches</h2>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {trendingSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="bg-gray-800 text-gray-300 px-3 lg:px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Events Grid */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-white mb-4">Popular Events</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                  {mockEvents.slice(0, 6).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onEventSelect(event)}
                      className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
                      style={{
                        background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${event.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                        <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 text-xs lg:text-sm mb-2">{event.date}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-400 font-bold text-sm lg:text-base">
                            ${event.price}
                          </span>
                          <span className="text-gray-400 text-xs lg:text-sm">
                            {event.attendees} going
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-400 mb-4 lg:mb-6 text-sm lg:text-base">
                {filteredEvents.length} events found for "{searchQuery}"
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventSelect(event)}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${event.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                      <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 text-xs lg:text-sm mb-2">{event.date}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-bold text-sm lg:text-base">
                          ${event.price}
                        </span>
                        <span className="text-gray-400 text-xs lg:text-sm">
                          {event.attendees} going
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};