import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EventCard } from './EventCard';
import { mockEvents } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface FollowingProps {
  onEventSelect: (event: any) => void;
  onProfileClick: (profile: any) => void;
  onCommentsClick: (event: any) => void;
}

export const Following: React.FC<FollowingProps> = ({ onEventSelect, onProfileClick, onCommentsClick }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const { followedProfiles } = useApp();
  
  // Pull to refresh state
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const pullStartRef = useRef({ y: 0, scrollTop: 0 });
  const pullThreshold = 80;

  // Mouse/click drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ y: 0, scrollTop: 0, time: 0 });
  const dragCurrentRef = useRef({ y: 0 });

  // Filter events to only show those from followed accounts
  const followingEvents = mockEvents.filter(event => 
    followedProfiles.includes(event.organizer.id)
  );

  const handleRefresh = useCallback(async () => {
    if (refreshing) return; // Prevent multiple refreshes
    
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Use setTimeout to prevent flicker
    setTimeout(() => {
      setRefreshing(false);
      setPullDistance(0);
      setIsPulling(false);
    }, 100);
  }, [refreshing]);

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current && !isScrollingRef.current) {
      const container = containerRef.current;
      const targetScrollTop = index * container.clientHeight;
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
      
      setCurrentIndex(index);
    }
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    if (isScrollingRef.current || isPulling || isDragging || refreshing) return;
    
    isScrollingRef.current = true;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.max(0, Math.min(followingEvents.length - 1, currentIndex + direction));
    
    if (newIndex !== currentIndex) {
      scrollToIndex(newIndex);
    }
    
    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }, [currentIndex, followingEvents.length, isPulling, isDragging, refreshing, scrollToIndex]);

  // Mouse drag handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || refreshing) return;
    
    const scrollTop = containerRef.current.scrollTop;
    
    setIsDragging(true);
    dragStartRef.current = {
      y: e.clientY,
      scrollTop: scrollTop,
      time: Date.now()
    };
    
    dragCurrentRef.current = {
      y: e.clientY
    };

    // Only start pull detection if at top of scroll
    if (scrollTop === 0) {
      setIsPulling(true);
    }

    // Prevent text selection during drag
    e.preventDefault();
  }, [refreshing]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || refreshing) return;
    
    const scrollTop = containerRef.current.scrollTop;
    
    dragCurrentRef.current = {
      y: e.clientY
    };

    // Handle pull to refresh
    if (isPulling && scrollTop === 0) {
      const deltaY = e.clientY - dragStartRef.current.y;
      
      if (deltaY > 0) {
        e.preventDefault();
        const distance = Math.min(deltaY * 0.5, pullThreshold * 1.5);
        setPullDistance(distance);
      } else {
        setIsPulling(false);
        setPullDistance(0);
      }
    }
  }, [isDragging, isPulling, pullThreshold, refreshing]);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isDragging || refreshing) return;
    
    setIsDragging(false);

    if (isPulling) {
      if (pullDistance >= pullThreshold) {
        handleRefresh();
      } else {
        setPullDistance(0);
        setIsPulling(false);
      }
      return;
    }
    
    if (isScrollingRef.current) return;
    
    const deltaY = dragStartRef.current.y - dragCurrentRef.current.y;
    const deltaTime = Date.now() - dragStartRef.current.time;
    const velocity = Math.abs(deltaY) / deltaTime;
    
    // Minimum drag distance and velocity for triggering snap
    if (Math.abs(deltaY) > 50 || velocity > 0.5) {
      isScrollingRef.current = true;
      
      const direction = deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(followingEvents.length - 1, currentIndex + direction));
      
      if (newIndex !== currentIndex) {
        scrollToIndex(newIndex);
      }
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, [isDragging, isPulling, pullDistance, pullThreshold, currentIndex, followingEvents.length, handleRefresh, scrollToIndex, refreshing]);

  // Touch handlers
  const handleTouchStart = useRef({ y: 0, time: 0 });
  const handleTouchMove = useRef({ y: 0 });

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current || refreshing) return;
    
    const touch = e.touches[0];
    const scrollTop = containerRef.current.scrollTop;
    
    handleTouchStart.current = {
      y: touch.clientY,
      time: Date.now()
    };
    
    pullStartRef.current = {
      y: touch.clientY,
      scrollTop: scrollTop
    };
    
    // Only start pull detection if at top of scroll
    if (scrollTop === 0) {
      setIsPulling(true);
    }
  }, [refreshing]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current || refreshing) return;
    
    const touch = e.touches[0];
    const scrollTop = containerRef.current.scrollTop;
    
    handleTouchMove.current = {
      y: touch.clientY
    };
    
    // Handle pull to refresh
    if (isPulling && scrollTop === 0) {
      const deltaY = touch.clientY - pullStartRef.current.y;
      
      if (deltaY > 0) {
        e.preventDefault();
        const distance = Math.min(deltaY * 0.5, pullThreshold * 1.5);
        setPullDistance(distance);
      } else {
        setIsPulling(false);
        setPullDistance(0);
      }
    }
  }, [isPulling, pullThreshold, refreshing]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (refreshing) return;
    
    if (isPulling) {
      if (pullDistance >= pullThreshold) {
        handleRefresh();
      } else {
        setPullDistance(0);
        setIsPulling(false);
      }
      return;
    }
    
    if (isScrollingRef.current) return;
    
    const deltaY = handleTouchStart.current.y - handleTouchMove.current.y;
    const deltaTime = Date.now() - handleTouchStart.current.time;
    const velocity = Math.abs(deltaY) / deltaTime;
    
    // Minimum swipe distance and velocity for triggering snap
    if (Math.abs(deltaY) > 50 || velocity > 0.5) {
      isScrollingRef.current = true;
      
      const direction = deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(followingEvents.length - 1, currentIndex + direction));
      
      if (newIndex !== currentIndex) {
        scrollToIndex(newIndex);
      }
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, [isPulling, pullDistance, pullThreshold, currentIndex, followingEvents.length, handleRefresh, scrollToIndex, refreshing]);

  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || isPulling || isDragging || refreshing) return;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set new timeout to snap to nearest card after scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const cardHeight = container.clientHeight;
        const nearestIndex = Math.round(scrollTop / cardHeight);
        const clampedIndex = Math.max(0, Math.min(followingEvents.length - 1, nearestIndex));
        
        if (clampedIndex !== currentIndex) {
          scrollToIndex(clampedIndex);
        }
      }
    }, 150);
  }, [currentIndex, followingEvents.length, isPulling, isDragging, scrollToIndex, refreshing]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current || isPulling || isDragging || refreshing) return;
      
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const newIndex = Math.min(followingEvents.length - 1, currentIndex + 1);
        if (newIndex !== currentIndex) {
          scrollToIndex(newIndex);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = Math.max(0, currentIndex - 1);
        if (newIndex !== currentIndex) {
          scrollToIndex(newIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, followingEvents.length, scrollToIndex, refreshing]);

  // Global mouse event listeners for drag
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current || refreshing) return;
      
      const scrollTop = containerRef.current.scrollTop;
      
      dragCurrentRef.current = {
        y: e.clientY
      };

      // Handle pull to refresh
      if (isPulling && scrollTop === 0) {
        const deltaY = e.clientY - dragStartRef.current.y;
        
        if (deltaY > 0) {
          e.preventDefault();
          const distance = Math.min(deltaY * 0.5, pullThreshold * 1.5);
          setPullDistance(distance);
        } else {
          setIsPulling(false);
          setPullDistance(0);
        }
      }
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging || refreshing) return;
      
      setIsDragging(false);

      if (isPulling) {
        if (pullDistance >= pullThreshold) {
          handleRefresh();
        } else {
          setPullDistance(0);
          setIsPulling(false);
        }
        return;
      }
      
      if (isScrollingRef.current) return;
      
      const deltaY = dragStartRef.current.y - dragCurrentRef.current.y;
      const deltaTime = Date.now() - dragStartRef.current.time;
      const velocity = Math.abs(deltaY) / deltaTime;
      
      // Minimum drag distance and velocity for triggering snap
      if (Math.abs(deltaY) > 50 || velocity > 0.5) {
        isScrollingRef.current = true;
        
        const direction = deltaY > 0 ? 1 : -1;
        const newIndex = Math.max(0, Math.min(followingEvents.length - 1, currentIndex + direction));
        
        if (newIndex !== currentIndex) {
          scrollToIndex(newIndex);
        }
        
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, isPulling, pullDistance, currentIndex, followingEvents.length, pullThreshold, handleRefresh, scrollToIndex, refreshing]);

  // Calculate pull indicator opacity and rotation
  const pullOpacity = Math.min(pullDistance / pullThreshold, 1);
  const pullRotation = (pullDistance / pullThreshold) * 180;

  // Show empty state if no following events
  if (followingEvents.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4 pb-20 lg:pb-0">
        <div className="text-center space-y-4 lg:space-y-6 max-w-md">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
            <svg className="w-12 h-12 lg:w-16 lg:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">No Events Yet</h2>
          <p className="text-gray-400 text-base lg:text-lg">
            Follow some venues and event organizers to see their latest events here!
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Discover amazing venues in the Explore tab</p>
            <p>• Follow your favorite event organizers</p>
            <p>• Get personalized event recommendations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-hidden">
      {/* Header with Tabs - Only visible on mobile (hidden on lg and above) */}
      <div className="lg:hidden absolute top-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-lg border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-center">
          <div className="flex space-x-6">
            <button className="font-semibold pb-2 text-base transition-colors text-gray-400 hover:text-white">
              For You
            </button>
            <button className="font-semibold pb-2 text-base transition-colors text-white border-b-2 border-purple-500">
              Following
            </button>
            <button className="font-semibold pb-2 text-base transition-colors text-gray-400 hover:text-white">
              Live
            </button>
          </div>
        </div>
      </div>

      {/* Pull to Refresh Indicator */}
      {(isPulling || refreshing) && (
        <div 
          className="absolute top-20 lg:top-4 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-200"
          style={{
            transform: `translateX(-50%) translateY(${Math.min(pullDistance - 20, 60)}px)`,
            opacity: refreshing ? 1 : pullOpacity
          }}
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-full p-3 flex items-center space-x-2">
            <div 
              className={`w-6 h-6 border-2 border-gray-400 border-t-purple-500 rounded-full transition-transform duration-200 ${
                refreshing ? 'animate-spin' : ''
              }`}
              style={{
                transform: refreshing ? 'rotate(0deg)' : `rotate(${pullRotation}deg)`
              }}
            />
            <span className="text-white text-sm font-medium">
              {refreshing ? 'Refreshing...' : pullDistance >= pullThreshold ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}

      {/* Event Feed - Full height with internal scrolling */}
      <div 
        ref={containerRef}
        className={`h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        onWheel={handleWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onScroll={handleScroll}
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          userSelect: isDragging ? 'none' : 'auto'
        }}
      >
        {followingEvents.map((event, index) => (
          <div 
            key={event.id} 
            className="snap-start flex-shrink-0"
            style={{ 
              height: '100vh',
              minHeight: '100vh',
              maxHeight: '100vh'
            }}
          >
            <EventCard
              event={event}
              onClick={() => onEventSelect(event)}
              onProfileClick={onProfileClick}
              onCommentsClick={onCommentsClick}
              index={index}
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};