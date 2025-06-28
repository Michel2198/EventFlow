import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, MapPin, Calendar, Ticket, Users, MoreHorizontal, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EventCardProps {
  event: any;
  onClick: () => void;
  onProfileClick: (profile: any) => void;
  onCommentsClick: (event: any) => void;
  index: number;
  isActive?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onClick, 
  onProfileClick, 
  onCommentsClick,
  index, 
  isActive = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const { likedEvents, toggleLike, followedProfiles, toggleFollow } = useApp();
  const isLiked = likedEvents.includes(event.id);
  const isFollowing = followedProfiles.includes(event.organizer.id);

  // Auto-play video when card becomes active
  useEffect(() => {
    if (isActive && event.type === 'video') {
      const timer = setTimeout(() => setIsPlaying(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isActive, event.type]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(event.id);
  };

  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCommentsClick(event);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    }
  };

  const handleDescriptionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onProfileClick(event.organizer);
  };

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFollow(event.organizer.id);
  };

  const handleProfileHover = (show: boolean) => {
    setShowProfileTooltip(show);
  };

  // Check if description is long enough to need truncation
  const shouldTruncate = event.description.length > 100;
  const displayDescription = isDescriptionExpanded 
    ? event.description 
    : shouldTruncate 
      ? `${event.description.substring(0, 100)}...` 
      : event.description;

  return (
    <div className={`relative w-full h-full cursor-pointer group transition-all duration-500 ${
      isActive ? 'scale-100' : 'scale-95 opacity-80'
    }`}>
      {/* Background Image/Video */}
      <div 
        className="absolute inset-0 transition-transform duration-700"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: isActive ? 'scale(1)' : 'scale(1.1)'
        }}
        onClick={onClick}
      />

      {/* Content Overlay */}
      <div className={`absolute inset-0 flex transition-all duration-500 ${
        isActive ? 'opacity-100' : 'opacity-70'
      }`}>
        {/* Left side - Event Info */}
        <div className="flex-1 flex flex-col justify-end p-4 lg:p-8 pb-32 lg:pb-24">
          <div className={`space-y-3 lg:space-y-4 max-w-md transform transition-all duration-700 ${
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'
          }`}>
            {/* Event Details */}
            <div className="space-y-2 lg:space-y-3">
              <h2 className="text-white text-xl lg:text-2xl font-bold leading-tight">
                {event.title}
              </h2>
              
              {/* Expandable Description */}
              <div className="text-gray-200 text-sm lg:text-base">
                <p className={`leading-relaxed ${isDescriptionExpanded ? '' : 'line-clamp-2 lg:line-clamp-3'}`}>
                  {displayDescription}
                </p>
                {shouldTruncate && (
                  <button
                    onClick={handleDescriptionToggle}
                    className="text-white font-medium mt-1 hover:text-gray-300 transition-colors"
                  >
                    {isDescriptionExpanded ? 'See less' : 'See more'}
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 lg:gap-4 text-xs lg:text-sm">
                <div className="flex items-center text-gray-300">
                  <Calendar size={16} className="mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">{event.date} • {event.time}</span>
                  <span className="sm:hidden">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin size={16} className="mr-1 lg:mr-2" />
                  <span className="truncate max-w-[120px] lg:max-w-none">{event.location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users size={16} className="mr-1 lg:mr-2" />
                  {event.attendees} going
                </div>
              </div>

              {/* Ticket Info - Fixed positioning */}
              <div className={`flex items-center justify-between bg-black/60 backdrop-blur-sm rounded-full px-4 lg:px-6 py-3 lg:py-4 max-w-xs lg:max-w-sm transform transition-all duration-500 ${
                isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
              }`}>
                <div className="flex items-center text-white">
                  <Ticket size={18} className="mr-2 lg:mr-3" />
                  <span className="font-bold text-base lg:text-lg">${event.price}</span>
                </div>
                <button 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-white text-sm lg:text-base font-semibold hover:scale-105 transition-transform whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Profile and Actions */}
        <div className={`flex flex-col justify-end items-center space-y-3 lg:space-y-4 p-4 lg:p-8 pb-32 lg:pb-24 transform transition-all duration-700 ${
          isActive ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-80'
        }`}>
          {/* Profile Image with Follow Button and Tooltip */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              onMouseEnter={() => handleProfileHover(true)}
              onMouseLeave={() => handleProfileHover(false)}
              className="block relative group"
            >
              <img
                src={event.organizer.avatar}
                alt={event.organizer.name}
                className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] rounded-full border-2 border-white hover:scale-110 transition-transform"
              />
              
              {/* Profile Name Tooltip */}
              {showProfileTooltip && (
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 z-50">
                  <div className="bg-black/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                    {event.organizer.name}
                    {event.organizer.type && (
                      <div className="text-xs text-gray-300 mt-1">{event.organizer.type}</div>
                    )}
                    {/* Tooltip arrow */}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </div>
              )}
            </button>
            
            {/* Follow/Following Button */}
            <button
              onClick={handleFollowClick}
              className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs transition-all duration-200 hover:translate-y-[-2px] ${
                isFollowing 
                  ? 'bg-gray-800' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isFollowing ? '✓' : <Plus size={12} />}
            </button>
          </div>

          {/* Action Buttons with Circular Backgrounds */}
          <div className="flex flex-col items-center space-y-3 lg:space-y-4">
            {/* Like Button */}
            <div className="flex flex-col items-center space-y-1">
              <button
                onClick={handleLike}
                className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:translate-y-[-2px] hover:bg-black/50"
              >
                <Heart 
                  size={28} 
                  className={`transition-colors duration-200 ${
                    isLiked ? 'text-red-500' : 'text-white'
                  }`}
                  fill={isLiked ? 'currentColor' : 'none'} 
                />
              </button>
              <span className="text-white font-medium text-sm">{event.likes + (isLiked ? 1 : 0)}</span>
            </div>

            {/* Comment Button */}
            <div className="flex flex-col items-center space-y-1">
              <button 
                onClick={handleComments}
                className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:translate-y-[-2px] hover:bg-black/50"
              >
                <MessageCircle size={28} className="text-white" fill="none" />
              </button>
              <span className="text-white font-medium text-sm">{event.comments}</span>
            </div>

            {/* Attending Button - Now positioned before Share */}
            <div className="flex flex-col items-center space-y-1">
              <button className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:translate-y-[-2px] hover:bg-black/50">
                <Users size={28} className="text-white" />
              </button>
              <span className="text-white font-medium text-sm">{event.attendees}</span>
            </div>

            {/* Share Button */}
            <div className="flex flex-col items-center space-y-1">
              <button
                onClick={handleShare}
                className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:translate-y-[-2px] hover:bg-black/50"
              >
                <Share size={28} className="text-white" fill="none" />
              </button>
            </div>

            {/* More Button */}
            <div className="flex flex-col items-center space-y-1">
              <button className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:translate-y-[-2px] hover:bg-black/50">
                <MoreHorizontal size={28} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Play indicator for video events */}
      {event.type === 'video' && (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-[16px] lg:border-l-[20px] border-l-white border-t-[10px] lg:border-t-[12px] border-t-transparent border-b-[10px] lg:border-b-[12px] border-b-transparent ml-1" />
          </div>
        </div>
      )}

      {/* Loading indicator for active card */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/20">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
        </div>
      )}
    </div>
  );
};