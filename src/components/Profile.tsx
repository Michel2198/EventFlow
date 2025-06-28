import React, { useState } from 'react';
import { Settings, Grid, Heart, Calendar, Users, MapPin, Star, Edit, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfileProps {
  user: any;
  onAuthRequired: () => void;
  viewingProfile?: any; // New prop for viewing other profiles
  onBackToOwnProfile?: () => void; // New prop for going back to own profile
}

export const Profile: React.FC<ProfileProps> = ({ 
  user, 
  onAuthRequired, 
  viewingProfile, 
  onBackToOwnProfile 
}) => {
  const [activeTab, setActiveTab] = useState('events');
  const { followedProfiles, likedEvents, toggleFollow } = useApp();

  // Determine which profile to show
  const profileToShow = viewingProfile || user;
  const isViewingOtherProfile = !!viewingProfile;
  const isFollowingProfile = viewingProfile ? followedProfiles.includes(viewingProfile.id) : false;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pb-20 lg:pb-0">
        <div className="text-center space-y-4 lg:space-y-6 max-w-md">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
            <Users size={40} className="text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">Join EventFlow</h2>
          <p className="text-gray-400 text-base lg:text-lg">
            Sign up to discover amazing local events, follow your favorite venues, and never miss out!
          </p>
          <button
            onClick={onAuthRequired}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-base lg:text-lg hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const mockUserEvents = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
      title: 'Jazz Night',
      date: 'Dec 15'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
      title: 'Food Festival',
      date: 'Dec 20'
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      title: 'Electronic Night',
      date: 'Dec 22'
    },
    {
      id: '4',
      image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg',
      title: 'Art Gallery',
      date: 'Dec 25'
    }
  ];

  const handleFollowToggle = () => {
    if (viewingProfile) {
      toggleFollow(viewingProfile.id);
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="relative">
        {/* Back button for viewing other profiles */}
        {isViewingOtherProfile && onBackToOwnProfile && (
          <button
            onClick={onBackToOwnProfile}
            className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {/* Cover Photo */}
        <div 
          className="h-48 lg:h-64 bg-gradient-to-r from-purple-600 to-pink-600"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        />
        
        {/* Profile Info */}
        <div className="px-4 lg:px-8 pb-6 lg:pb-8">
          <div className="flex items-end justify-between -mt-16 lg:-mt-20 mb-4 lg:mb-6">
            <img
              src={profileToShow.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
              alt={profileToShow.name}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-black bg-black"
            />
            <div className="flex space-x-2 lg:space-x-3">
              {isViewingOtherProfile ? (
                <button 
                  onClick={handleFollowToggle}
                  className={`px-4 lg:px-6 py-2 rounded-full font-semibold transition-colors flex items-center space-x-2 text-sm lg:text-base ${
                    isFollowingProfile
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                  }`}
                >
                  {isFollowingProfile ? (
                    <>
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <span>Follow</span>
                    </>
                  )}
                </button>
              ) : (
                <>
                  <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm lg:text-base">
                    <Edit size={16} />
                    <span className="hidden sm:inline">Edit Profile</span>
                    <span className="sm:hidden">Edit</span>
                  </button>
                  <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                    <Settings size={18} lg:size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-3 lg:space-y-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{profileToShow.name}</h1>
              <p className="text-gray-400 text-base lg:text-lg">
                @{profileToShow.username || profileToShow.name.toLowerCase().replace(/\s+/g, '')}
              </p>
              {isViewingOtherProfile && profileToShow.type && (
                <p className="text-purple-400 text-sm lg:text-base font-medium">{profileToShow.type}</p>
              )}
            </div>
            
            <p className="text-gray-300 text-sm lg:text-lg max-w-2xl">
              {profileToShow.bio || "Event enthusiast exploring the local scene 🎉"}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm lg:text-base">
              <div className="flex items-center text-gray-300">
                <MapPin size={16} lg:size={20} className="mr-2" />
                {profileToShow.location || 'San Francisco, CA'}
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar size={16} lg:size={20} className="mr-2" />
                Joined {profileToShow.joinDate || 'Dec 2024'}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 lg:gap-8 max-w-md">
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-white">
                  {isViewingOtherProfile ? '24' : followedProfiles.length}
                </p>
                <p className="text-gray-400 text-xs lg:text-sm">Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-white">
                  {isViewingOtherProfile ? '1.2K' : '892'}
                </p>
                <p className="text-gray-400 text-xs lg:text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-white">
                  {isViewingOtherProfile ? '156' : likedEvents.length}
                </p>
                <p className="text-gray-400 text-xs lg:text-sm">Liked</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-white">
                  {isViewingOtherProfile ? '47' : '24'}
                </p>
                <p className="text-gray-400 text-xs lg:text-sm">Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 px-4 lg:px-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center space-x-2 py-3 lg:py-4 px-4 lg:px-6 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'events'
              ? 'text-white border-b-2 border-purple-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Grid size={18} lg:size={20} />
          <span>Events</span>
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center space-x-2 py-3 lg:py-4 px-4 lg:px-6 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'liked'
              ? 'text-white border-b-2 border-purple-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={18} lg:size={20} />
          <span>Liked</span>
        </button>
        <button
          onClick={() => setActiveTab('attending')}
          className={`flex items-center space-x-2 py-3 lg:py-4 px-4 lg:px-6 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'attending'
              ? 'text-white border-b-2 border-purple-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Star size={18} lg:size={20} />
          <span>Attending</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-8">
        {activeTab === 'events' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
            {mockUserEvents.map((event) => (
              <div
                key={event.id}
                className="aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%), url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-3 lg:p-4 w-full">
                    <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 text-xs lg:text-sm">{event.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'liked' && (
          <div className="text-center py-12 lg:py-16">
            <Heart className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4 lg:mb-6" />
            <h3 className="text-lg lg:text-xl font-semibold text-gray-400 mb-2">
              {isViewingOtherProfile ? 'No public liked events' : 'No liked events yet'}
            </h3>
            <p className="text-gray-500 text-sm lg:text-base">
              {isViewingOtherProfile 
                ? 'This user\'s liked events are private' 
                : 'Events you like will appear here'
              }
            </p>
          </div>
        )}
        
        {activeTab === 'attending' && (
          <div className="text-center py-12 lg:py-16">
            <Star className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4 lg:mb-6" />
            <h3 className="text-lg lg:text-xl font-semibold text-gray-400 mb-2">
              {isViewingOtherProfile ? 'No public events' : 'No upcoming events'}
            </h3>
            <p className="text-gray-500 text-sm lg:text-base">
              {isViewingOtherProfile 
                ? 'This user\'s attending events are private' 
                : 'Events you\'re attending will appear here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};