import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Heart, MessageCircle, MoreHorizontal, Send, Reply, Flag } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

interface CommentsModalProps {
  event: any;
  onClose: () => void;
  user: any;
  onAuthRequired: () => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  event,
  onClose,
  user,
  onAuthRequired
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comment-1',
      user: {
        id: 'user-1',
        name: 'Sarah Chen',
        username: 'sarahc',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      content: 'This looks amazing! Can\'t wait to experience the jazz vibes 🎷✨',
      timestamp: '2h',
      likes: 24,
      replies: [
        {
          id: 'reply-1',
          user: {
            id: 'user-2',
            name: 'Mike Johnson',
            username: 'mikej',
            avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face'
          },
          content: 'Same here! The lineup is incredible this year',
          timestamp: '1h',
          likes: 8,
          replies: []
        }
      ],
      isLiked: false
    },
    {
      id: 'comment-2',
      user: {
        id: 'user-3',
        name: 'Alex Rivera',
        username: 'alexr',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face'
      },
      content: 'Perfect venue for this kind of event! The acoustics there are phenomenal 🎵',
      timestamp: '3h',
      likes: 15,
      replies: [],
      isLiked: true
    },
    {
      id: 'comment-3',
      user: {
        id: 'user-4',
        name: 'Emma Davis',
        username: 'emmad',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&crop=face'
      },
      content: 'Anyone know if there will be food trucks? Planning to make a whole evening of it! 🍕',
      timestamp: '4h',
      likes: 7,
      replies: [
        {
          id: 'reply-2',
          user: {
            id: 'venue-1',
            name: 'SF Jazz Club',
            username: 'sfjazzclub',
            avatar: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?w=100&h=100&fit=crop&crop=face',
            verified: true
          },
          content: 'Yes! We\'ll have 5 amazing food trucks and a full bar setup 🍻',
          timestamp: '3h',
          likes: 32,
          replies: []
        }
      ],
      isLiked: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set(['comment-2']));
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replyTextareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  // Auto-resize textarea function
  const adjustTextareaHeight = useCallback((textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }, []);

  // Handle main comment textarea resize
  const handleMainTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // Handle reply textarea change
  const handleReplyTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: string) => {
    setReplyContent(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // Set reply textarea ref
  const setReplyTextareaRef = (commentId: string) => (ref: HTMLTextAreaElement | null) => {
    replyTextareaRefs.current[commentId] = ref;
    if (ref && replyingTo === commentId) {
      // Focus and adjust height when reply textarea is created
      setTimeout(() => {
        ref.focus();
        adjustTextareaHeight(ref);
      }, 0);
    }
  };

  const handleCommentSubmit = () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar
      },
      content: newComment.trim(),
      timestamp: 'now',
      likes: 0,
      replies: [],
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleReplySubmit = (commentId: string) => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar
      },
      content: replyContent.trim(),
      timestamp: 'now',
      likes: 0,
      replies: []
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyContent('');
    setReplyingTo(null);
    // Clean up the ref
    delete replyTextareaRefs.current[commentId];
  };

  const handleLikeComment = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (!user) {
      onAuthRequired();
      return;
    }

    const newLikedComments = new Set(likedComments);
    const isCurrentlyLiked = likedComments.has(commentId);

    if (isCurrentlyLiked) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }

    setLikedComments(newLikedComments);

    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { 
                      ...reply, 
                      likes: isCurrentlyLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !isCurrentlyLiked
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: isCurrentlyLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !isCurrentlyLiked
            }
          : comment
      ));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      action();
    }
  };

  const handleCancelReply = (commentId: string) => {
    setReplyingTo(null);
    setReplyContent('');
    delete replyTextareaRefs.current[commentId];
  };

  const CommentComponent: React.FC<{ 
    comment: Comment; 
    isReply?: boolean; 
    parentId?: string;
  }> = ({ comment, isReply = false, parentId }) => {
    const isLiked = likedComments.has(comment.id);

    return (
      <div className={`${isReply ? 'ml-12 mt-3' : 'mb-6'}`}>
        <div className="flex space-x-3">
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-white text-sm">
                {comment.user.name}
              </span>
              {comment.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              <span className="text-gray-400 text-xs">@{comment.user.username}</span>
              <span className="text-gray-500 text-xs">•</span>
              <span className="text-gray-500 text-xs">{comment.timestamp}</span>
            </div>
            
            <p className="text-gray-200 text-sm leading-relaxed mb-2">
              {comment.content}
            </p>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLikeComment(comment.id, isReply, parentId)}
                className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Heart 
                  size={16} 
                  className={isLiked ? 'text-red-500' : ''}
                  fill={isLiked ? 'currentColor' : 'none'}
                />
                <span className="text-xs">{comment.likes}</span>
              </button>
              
              {!isReply && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Reply size={16} />
                  <span className="text-xs">Reply</span>
                </button>
              )}
              
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
            
            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="mt-3 flex space-x-2">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                  alt="Your avatar"
                  className="w-6 h-6 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    ref={setReplyTextareaRef(comment.id)}
                    value={replyContent}
                    onChange={(e) => handleReplyTextareaChange(e, comment.id)}
                    onKeyDown={(e) => handleKeyPress(e, () => handleReplySubmit(comment.id))}
                    placeholder={`Reply to ${comment.user.name}...`}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={1}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      Cmd/Ctrl + Enter to send
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancelReply(comment.id)}
                        className="text-gray-400 hover:text-white text-xs px-3 py-1 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(comment.id)}
                        disabled={!replyContent.trim()}
                        className="bg-purple-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="mt-3 space-y-3">
                {comment.replies.map((reply) => (
                  <CommentComponent 
                    key={reply.id} 
                    comment={reply} 
                    isReply={true}
                    parentId={comment.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-end lg:items-center lg:justify-center">
        <div className="w-full lg:w-[600px] lg:max-w-[90vw] bg-gray-900 lg:rounded-2xl lg:max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <img
                src={event.image}
                alt={event.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-white font-semibold text-lg">Comments</h2>
                <p className="text-gray-400 text-sm">{event.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 max-h-[60vh] lg:max-h-none">
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">No comments yet</h3>
                <p className="text-gray-500">Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))
            )}
          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-800 p-4 lg:p-6">
            {user ? (
              <div className="flex space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    value={newComment}
                    onChange={handleMainTextareaChange}
                    onKeyDown={(e) => handleKeyPress(e, handleCommentSubmit)}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={1}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      Cmd/Ctrl + Enter to send
                    </span>
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!newComment.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                    >
                      <Send size={16} />
                      <span>Post</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 mb-4">Sign in to join the conversation</p>
                <button
                  onClick={onAuthRequired}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};