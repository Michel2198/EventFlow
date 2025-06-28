import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  TrendingUp, 
  Bell, 
  FileText, 
  Database, 
  UserCheck, 
  AlertTriangle, 
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  Star,
  MessageSquare,
  Heart,
  Share2,
  X,
  Save,
  User,
  Mail,
  Phone,
  Shield,
  Ban,
  UserX,
  Activity,
  Zap,
  Globe,
  Lock,
  Key,
  Server,
  Monitor,
  Smartphone,
  Palette,
  Image,
  Type,
  Layout,
  Code,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  CloudUpload,
  Archive,
  RefreshCw,
  Power,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Upload,
  Link,
  ExternalLink,
  Copy,
  RotateCcw,
  Toggle
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  activeSection: string;
  onLogout: () => void;
}

// Mock data for different sections
const mockEvents = [
  {
    id: 'event-1',
    title: 'Summer Jazz Festival',
    organizer: 'SF Jazz Club',
    date: '2024-12-15',
    status: 'approved',
    attendees: 1243,
    revenue: 55935,
    category: 'Music',
    location: 'Golden Gate Park',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=100&h=100&fit=crop'
  },
  {
    id: 'event-2',
    title: 'Local Food Market',
    organizer: 'Bay Area Events',
    date: '2024-12-18',
    status: 'pending',
    attendees: 856,
    revenue: 21400,
    category: 'Food',
    location: 'Mission District',
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=100&h=100&fit=crop'
  },
  {
    id: 'event-3',
    title: 'Electronic Music Night',
    organizer: 'Nightclub SF',
    date: '2024-12-20',
    status: 'approved',
    attendees: 2156,
    revenue: 75460,
    category: 'Nightlife',
    location: 'The Warfield',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=100&h=100&fit=crop'
  },
  {
    id: 'event-4',
    title: 'Art Gallery Opening',
    organizer: 'Modern Art Gallery',
    date: '2024-12-22',
    status: 'rejected',
    attendees: 467,
    revenue: 9340,
    category: 'Art',
    location: 'SFMOMA',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?w=100&h=100&fit=crop'
  }
];

const mockUsers = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    role: 'Event Organizer',
    status: 'active',
    joinDate: '2024-01-15',
    eventsCreated: 12,
    totalRevenue: 45600,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
    lastActive: '2 hours ago',
    verified: true
  },
  {
    id: 'user-2',
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    role: 'Attendee',
    status: 'active',
    joinDate: '2024-03-22',
    eventsCreated: 0,
    totalRevenue: 0,
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face',
    lastActive: '1 day ago',
    verified: false
  },
  {
    id: 'user-3',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    role: 'Venue Owner',
    status: 'suspended',
    joinDate: '2024-02-10',
    eventsCreated: 8,
    totalRevenue: 32400,
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face',
    lastActive: '1 week ago',
    verified: true
  },
  {
    id: 'user-4',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    role: 'Event Organizer',
    status: 'pending',
    joinDate: '2024-12-01',
    eventsCreated: 2,
    totalRevenue: 5600,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&crop=face',
    lastActive: '3 hours ago',
    verified: false
  }
];

const mockNotifications = [
  {
    id: 'notif-1',
    type: 'security',
    priority: 'critical',
    title: 'Suspicious Login Attempt',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100',
    timestamp: '2 minutes ago',
    read: false,
    actionRequired: true,
    relatedUser: {
      name: 'Unknown User',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 'notif-2',
    type: 'events',
    priority: 'high',
    title: 'Event Approval Required',
    message: 'New event "Summer Music Festival" requires admin approval',
    timestamp: '15 minutes ago',
    read: false,
    actionRequired: true,
    relatedEvent: {
      title: 'Summer Music Festival',
      organizer: 'Music Events Co.'
    }
  },
  {
    id: 'notif-3',
    type: 'users',
    priority: 'medium',
    title: 'New User Registration',
    message: 'John Smith has registered as an event organizer',
    timestamp: '1 hour ago',
    read: true,
    actionRequired: false,
    relatedUser: {
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 'notif-4',
    type: 'system',
    priority: 'low',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance window: Dec 25, 2024 at 2:00 AM PST',
    timestamp: '2 hours ago',
    read: true,
    actionRequired: false
  },
  {
    id: 'notif-5',
    type: 'payments',
    priority: 'high',
    title: 'Payment Processing Error',
    message: 'Failed to process payment for event "Jazz Night" - Transaction ID: TXN123456',
    timestamp: '3 hours ago',
    read: false,
    actionRequired: true,
    relatedEvent: {
      title: 'Jazz Night',
      organizer: 'SF Jazz Club'
    }
  },
  {
    id: 'notif-6',
    type: 'reports',
    priority: 'medium',
    title: 'Weekly Analytics Report Ready',
    message: 'Your weekly platform analytics report is ready for download',
    timestamp: '1 day ago',
    read: true,
    actionRequired: false
  }
];

// User Edit Modal Component
const UserEditModal: React.FC<{
  user: any;
  onClose: () => void;
  onSave: (userData: any) => void;
}> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    verified: user.verified
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Edit User</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Attendee">Attendee</option>
              <option value="Event Organizer">Event Organizer</option>
              <option value="Venue Owner">Venue Owner</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="verified"
              checked={formData.verified}
              onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
              className="rounded bg-gray-800 border-gray-600 text-purple-500 focus:ring-purple-500"
            />
            <label htmlFor="verified" className="text-white">Verified Account</label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:scale-105 transition-transform"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, activeSection, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [notificationFilters, setNotificationFilters] = useState({
    type: 'all',
    priority: 'all',
    read: 'all'
  });
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      security: true,
      events: true,
      users: false,
      system: true,
      payments: true,
      reports: false
    },
    pushNotifications: {
      security: true,
      events: false,
      users: false,
      system: false,
      payments: true,
      reports: false
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  // Admin Settings State
  const [settingsTab, setSettingsTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'EventFlow',
    platformDescription: 'Discover amazing local events and never miss out',
    contactEmail: 'admin@eventflow.com',
    supportEmail: 'support@eventflow.com',
    timezone: 'America/Los_Angeles',
    language: 'en',
    currency: 'USD',
    maintenanceMode: false,
    registrationEnabled: true,
    eventCreationEnabled: true,
    publicRegistration: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    ipWhitelist: '',
    apiRateLimit: 1000,
    enableAuditLog: true,
    dataRetentionDays: 365
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
    applePay: true,
    googlePay: true,
    platformFee: 5.0,
    processingFee: 2.9,
    payoutSchedule: 'weekly',
    minimumPayout: 25.00,
    currency: 'USD',
    taxCalculation: true,
    refundPolicy: 'flexible'
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.eventflow.com',
    smtpPort: 587,
    smtpUsername: 'noreply@eventflow.com',
    smtpPassword: '••••••••',
    fromName: 'EventFlow',
    fromEmail: 'noreply@eventflow.com',
    replyToEmail: 'support@eventflow.com',
    emailVerificationRequired: true,
    welcomeEmailEnabled: true,
    eventReminderEnabled: true,
    marketingEmailsEnabled: false
  });

  const [apiSettings, setApiSettings] = useState({
    apiEnabled: true,
    apiVersion: 'v1',
    rateLimit: 1000,
    webhooksEnabled: true,
    webhookSecret: '••••••••••••••••',
    corsOrigins: 'https://eventflow.com',
    apiDocumentation: true,
    deprecationNotices: true
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackupEnabled: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    backupLocation: 'aws-s3',
    encryptBackups: true,
    lastBackup: '2024-12-27 03:00:00',
    backupSize: '2.4 GB',
    nextBackup: '2024-12-28 03:00:00'
  });

  const handleUserEdit = (user: any) => {
    setEditingUser(user);
  };

  const handleUserSave = (userData: any) => {
    console.log('Saving user:', userData);
    // Here you would typically make an API call to update the user
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Performing ${action} on user ${userId}`);
    // Here you would typically make an API call
  };

  const handleBulkUserAction = (action: string) => {
    console.log(`Performing bulk ${action} on users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesType = notificationFilters.type === 'all' || notification.type === notificationFilters.type;
    const matchesPriority = notificationFilters.priority === 'all' || notification.priority === notificationFilters.priority;
    const matchesRead = notificationFilters.read === 'all' || 
                       (notificationFilters.read === 'read' && notification.read) ||
                       (notificationFilters.read === 'unread' && !notification.read);
    
    return matchesType && matchesPriority && matchesRead;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'security': return Shield;
      case 'events': return Calendar;
      case 'users': return Users;
      case 'system': return Server;
      case 'payments': return DollarSign;
      case 'reports': return FileText;
      default: return Bell;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const handleNotificationAction = (notificationId: string, action: string) => {
    console.log(`Performing ${action} on notification ${notificationId}`);
  };

  const handleBulkNotificationAction = (action: string) => {
    console.log(`Performing bulk ${action} on notifications:`, selectedNotifications);
    setSelectedNotifications([]);
  };

  const saveSettings = (settingsType: string) => {
    console.log(`Saving ${settingsType} settings`);
    // Here you would make API calls to save the settings
  };

  const resetSettings = (settingsType: string) => {
    console.log(`Resetting ${settingsType} settings`);
    // Here you would reset to default values
  };

  const testEmailSettings = () => {
    console.log('Testing email settings...');
    // Here you would send a test email
  };

  const generateApiKey = () => {
    const newKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log('Generated new API key:', newKey);
  };

  const triggerBackup = () => {
    console.log('Triggering manual backup...');
    // Here you would trigger a backup
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export Data</span>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2">
            <Plus size={16} />
            <span>Quick Action</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Events</p>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-green-400 text-sm">+12% from last month</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Calendar className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-white">8,924</p>
              <p className="text-green-400 text-sm">+8% from last month</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Users className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-white">$124,567</p>
              <p className="text-green-400 text-sm">+15% from last month</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <DollarSign className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">System Health</p>
              <p className="text-2xl font-bold text-white">98.5%</p>
              <p className="text-green-400 text-sm">All systems operational</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <Activity className="text-green-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
          <div className="space-y-4">
            {mockEvents.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center space-x-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{event.title}</p>
                  <p className="text-gray-400 text-xs">{event.organizer}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                  event.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">System Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-red-500/10 p-2 rounded-lg">
                <AlertTriangle className="text-red-400" size={16} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">High CPU Usage</p>
                <p className="text-gray-400 text-xs">Server load at 89% - consider scaling</p>
                <p className="text-gray-500 text-xs">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500/10 p-2 rounded-lg">
                <Clock className="text-yellow-400" size={16} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Scheduled Maintenance</p>
                <p className="text-gray-400 text-xs">Database maintenance in 2 hours</p>
                <p className="text-gray-500 text-xs">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-500/10 p-2 rounded-lg">
                <CheckCircle className="text-green-400" size={16} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Backup Completed</p>
                <p className="text-gray-400 text-xs">Daily backup finished successfully</p>
                <p className="text-gray-500 text-xs">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Events Management</h1>
          <p className="text-gray-400 mt-1">Manage and moderate platform events</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2">
            <Plus size={16} />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">All Categories</option>
              <option value="music">Music</option>
              <option value="food">Food</option>
              <option value="art">Art</option>
              <option value="sports">Sports</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Event</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Organizer</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Attendees</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Revenue</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.map((event) => (
                <tr key={event.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{event.title}</p>
                        <p className="text-gray-400 text-sm">{event.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">{event.organizer}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">{event.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                      event.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">{event.attendees.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">${event.revenue.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users Management</h1>
          <p className="text-gray-400 mt-1">Manage platform users and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{selectedUsers.length} selected</span>
              <button 
                onClick={() => handleBulkUserAction('suspend')}
                className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                Suspend
              </button>
              <button 
                onClick={() => handleBulkUserAction('delete')}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          )}
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2">
            <Plus size={16} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
              <option value="banned">Banned</option>
            </select>
            
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Roles</option>
              <option value="Attendee">Attendee</option>
              <option value="Event Organizer">Event Organizer</option>
              <option value="Venue Owner">Venue Owner</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(user => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                  />
                </th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">User</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Role</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Join Date</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Events</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Revenue</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                        }
                      }}
                      className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-medium">{user.name}</p>
                          {user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <p className="text-gray-500 text-xs">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'active' ? 'bg-green-500/10 text-green-400' :
                      user.status === 'suspended' ? 'bg-yellow-500/10 text-yellow-400' :
                      user.status === 'pending' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">{user.joinDate}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">{user.eventsCreated}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">${user.totalRevenue.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleUserEdit(user)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleUserAction(user.id, 'view')}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                        className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {user.status === 'active' ? <Ban size={16} /> : <UserCheck size={16} />}
                      </button>
                      <button 
                        onClick={() => handleUserAction(user.id, 'delete')}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Edit Modal */}
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUserSave}
        />
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>
          <p className="text-gray-400 mt-1">Platform insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Revenue</h3>
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white mb-2">$847,392</p>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 text-sm">+23.5%</span>
            <span className="text-gray-400 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Event Bookings</h3>
            <Calendar className="text-blue-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white mb-2">12,847</p>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 text-sm">+18.2%</span>
            <span className="text-gray-400 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">New Users</h3>
            <Users className="text-purple-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white mb-2">2,394</p>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 text-sm">+12.8%</span>
            <span className="text-gray-400 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Avg. Event Rating</h3>
            <Star className="text-yellow-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white mb-2">4.8</p>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 text-sm">+0.3</span>
            <span className="text-gray-400 text-sm">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Trends</h3>
            <select className="bg-gray-800 text-white rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="text-gray-600 mx-auto mb-2" size={48} />
              <p className="text-gray-400">Revenue chart would be displayed here</p>
              <p className="text-gray-500 text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">User Growth</h3>
            <select className="bg-gray-800 text-white rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="new">New Users</option>
              <option value="active">Active Users</option>
              <option value="returning">Returning Users</option>
            </select>
          </div>
          <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="text-gray-600 mx-auto mb-2" size={48} />
              <p className="text-gray-400">User growth chart would be displayed here</p>
              <p className="text-gray-500 text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Events */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Events</h3>
          <div className="space-y-4">
            {mockEvents.slice(0, 5).map((event, index) => (
              <div key={event.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{event.title}</p>
                  <p className="text-gray-400 text-xs">${event.revenue.toLocaleString()} revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Categories */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Categories</h3>
          <div className="space-y-4">
            {[
              { name: 'Music', percentage: 35, color: 'bg-purple-500' },
              { name: 'Food & Drink', percentage: 28, color: 'bg-blue-500' },
              { name: 'Nightlife', percentage: 20, color: 'bg-pink-500' },
              { name: 'Art & Culture', percentage: 12, color: 'bg-green-500' },
              { name: 'Sports', percentage: 5, color: 'bg-yellow-500' }
            ].map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">{category.name}</span>
                  <span className="text-gray-400 text-sm">{category.percentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Locations</h3>
          <div className="space-y-4">
            {[
              { city: 'San Francisco', events: 342, percentage: 28 },
              { city: 'Los Angeles', events: 298, percentage: 24 },
              { city: 'New York', events: 256, percentage: 21 },
              { city: 'Chicago', events: 189, percentage: 15 },
              { city: 'Miami', events: 147, percentage: 12 }
            ].map((location) => (
              <div key={location.city} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" size={16} />
                  <div>
                    <p className="text-white text-sm font-medium">{location.city}</p>
                    <p className="text-gray-400 text-xs">{location.events} events</p>
                  </div>
                </div>
                <span className="text-purple-400 font-medium text-sm">{location.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="text-blue-400" size={20} />
              <span className="font-medium">Revenue Report</span>
            </div>
            <p className="text-gray-400 text-sm">Detailed financial analytics and revenue breakdown</p>
          </button>

          <button className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="text-green-400" size={20} />
              <span className="font-medium">User Analytics</span>
            </div>
            <p className="text-gray-400 text-sm">User behavior, demographics, and engagement metrics</p>
          </button>

          <button className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="text-purple-400" size={20} />
              <span className="font-medium">Event Performance</span>
            </div>
            <p className="text-gray-400 text-sm">Event success metrics and performance analysis</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400 mt-1">Manage platform notifications and alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedNotifications.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{selectedNotifications.length} selected</span>
              <button 
                onClick={() => handleBulkNotificationAction('markRead')}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Mark Read
              </button>
              <button 
                onClick={() => handleBulkNotificationAction('delete')}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          )}
          <button 
            onClick={() => setShowNotificationSettings(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-400">3</p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg">
              <AlertTriangle className="text-red-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unread</p>
              <p className="text-2xl font-bold text-yellow-400">12</p>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <Bell className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Today</p>
              <p className="text-2xl font-bold text-blue-400">28</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Clock className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Action Required</p>
              <p className="text-2xl font-bold text-purple-400">7</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Zap className="text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <select 
              value={notificationFilters.type}
              onChange={(e) => setNotificationFilters({...notificationFilters, type: e.target.value})}
              className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="security">Security</option>
              <option value="events">Events</option>
              <option value="users">Users</option>
              <option value="system">System</option>
              <option value="payments">Payments</option>
              <option value="reports">Reports</option>
            </select>
            
            <select 
              value={notificationFilters.priority}
              onChange={(e) => setNotificationFilters({...notificationFilters, priority: e.target.value})}
              className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select 
              value={notificationFilters.read}
              onChange={(e) => setNotificationFilters({...notificationFilters, read: e.target.value})}
              className="bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedNotifications(filteredNotifications.map(notif => notif.id));
                } else {
                  setSelectedNotifications([]);
                }
              }}
              className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
            />
            <label htmlFor="selectAll" className="text-gray-300 text-sm">Select All</label>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const IconComponent = getNotificationIcon(notification.type);
          const colorClasses = getNotificationColor(notification.priority);
          
          return (
            <div
              key={notification.id}
              className={`bg-gray-900 rounded-xl p-6 border-l-4 transition-all hover:bg-gray-800/50 ${
                notification.read ? 'opacity-75' : ''
              } ${
                notification.priority === 'critical' ? 'border-red-500' :
                notification.priority === 'high' ? 'border-orange-500' :
                notification.priority === 'medium' ? 'border-yellow-500' :
                'border-blue-500'
              }`}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedNotifications([...selectedNotifications, notification.id]);
                    } else {
                      setSelectedNotifications(selectedNotifications.filter(id => id !== notification.id));
                    }
                  }}
                  className="mt-1 rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                />

                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <IconComponent size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-semibold">{notification.title}</h3>
                        {notification.actionRequired && (
                          <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                            Action Required
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                          {notification.priority}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-2">{notification.message}</p>
                      
                      {notification.relatedUser && (
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={notification.relatedUser.avatar}
                            alt={notification.relatedUser.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-gray-400 text-sm">{notification.relatedUser.name}</span>
                        </div>
                      )}
                      
                      {notification.relatedEvent && (
                        <div className="bg-gray-800 rounded-lg p-2 mb-2">
                          <p className="text-white text-sm font-medium">{notification.relatedEvent.title}</p>
                          <p className="text-gray-400 text-xs">by {notification.relatedEvent.organizer}</p>
                        </div>
                      )}
                      
                      <p className="text-gray-500 text-sm">{notification.timestamp}</p>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {notification.actionRequired && (
                        <div className="flex space-x-2">
                          {notification.type === 'security' && (
                            <>
                              <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm">
                                Block IP
                              </button>
                              <button className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                                Investigate
                              </button>
                            </>
                          )}
                          {notification.type === 'events' && (
                            <>
                              <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                Approve
                              </button>
                              <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm">
                                Reject
                              </button>
                            </>
                          )}
                          {notification.type === 'payments' && (
                            <>
                              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                Retry
                              </button>
                              <button className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                                Refund
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleNotificationAction(notification.id, notification.read ? 'markUnread' : 'markRead')}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {notification.read ? <Mail size={16} /> : <Eye size={16} />}
                      </button>
                      
                      <button
                        onClick={() => handleNotificationAction(notification.id, 'delete')}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification Settings Modal */}
      {showNotificationSettings && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Notification Settings</h2>
                <button
                  onClick={() => setShowNotificationSettings(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Email Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <button
                        onClick={() => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: {
                            ...notificationSettings.emailNotifications,
                            [key]: !value
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Push Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
                <div className="space-y-3">
                  {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <button
                        onClick={() => setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: {
                            ...notificationSettings.pushNotifications,
                            [key]: !value
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequency Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Notification Frequency</h3>
                <select
                  value={notificationSettings.frequency}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    frequency: e.target.value
                  })}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly Digest</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Digest</option>
                </select>
              </div>

              {/* Quiet Hours */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quiet Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Enable Quiet Hours</span>
                    <button
                      onClick={() => setNotificationSettings({
                        ...notificationSettings,
                        quietHours: {
                          ...notificationSettings.quietHours,
                          enabled: !notificationSettings.quietHours.enabled
                        }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.quietHours.enabled ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  {notificationSettings.quietHours.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Start Time</label>
                        <input
                          type="time"
                          value={notificationSettings.quietHours.start}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            quietHours: {
                              ...notificationSettings.quietHours,
                              start: e.target.value
                            }
                          })}
                          className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">End Time</label>
                        <input
                          type="time"
                          value={notificationSettings.quietHours.end}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            quietHours: {
                              ...notificationSettings.quietHours,
                              end: e.target.value
                            }
                          })}
                          className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowNotificationSettings(false)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Saving notification settings:', notificationSettings);
                    setShowNotificationSettings(false);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
          <p className="text-gray-400 mt-1">Configure platform settings and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => resetSettings(settingsTab)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          <button 
            onClick={() => saveSettings(settingsTab)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'general', label: 'General', icon: Settings },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'payments', label: 'Payments', icon: DollarSign },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'api', label: 'API', icon: Code },
            { id: 'backup', label: 'Backup', icon: Archive }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSettingsTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  settingsTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <IconComponent size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-gray-900 rounded-xl p-6">
        {settingsTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">General Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Platform Name</label>
                <input
                  type="text"
                  value={generalSettings.platformName}
                  onChange={(e) => setGeneralSettings({...generalSettings, platformName: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Support Email</label>
                <input
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Timezone</label>
                <select
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Default Language</label>
                <select
                  value={generalSettings.language}
                  onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Default Currency</label>
                <select
                  value={generalSettings.currency}
                  onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Platform Description</label>
              <textarea
                value={generalSettings.platformDescription}
                onChange={(e) => setGeneralSettings({...generalSettings, platformDescription: e.target.value})}
                rows={3}
                className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Platform Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Maintenance Mode</span>
                    <p className="text-gray-400 text-sm">Temporarily disable public access</p>
                  </div>
                  <button
                    onClick={() => setGeneralSettings({...generalSettings, maintenanceMode: !generalSettings.maintenanceMode})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      generalSettings.maintenanceMode ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">User Registration</span>
                    <p className="text-gray-400 text-sm">Allow new user signups</p>
                  </div>
                  <button
                    onClick={() => setGeneralSettings({...generalSettings, registrationEnabled: !generalSettings.registrationEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      generalSettings.registrationEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        generalSettings.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Event Creation</span>
                    <p className="text-gray-400 text-sm">Allow users to create events</p>
                  </div>
                  <button
                    onClick={() => setGeneralSettings({...generalSettings, eventCreationEnabled: !generalSettings.eventCreationEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      generalSettings.eventCreationEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        generalSettings.eventCreationEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Public Registration</span>
                    <p className="text-gray-400 text-sm">Allow registration without invitation</p>
                  </div>
                  <button
                    onClick={() => setGeneralSettings({...generalSettings, publicRegistration: !generalSettings.publicRegistration})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      generalSettings.publicRegistration ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        generalSettings.publicRegistration ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Security Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Password Min Length</label>
                <input
                  type="number"
                  value={securitySettings.passwordMinLength}
                  onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">API Rate Limit (per hour)</label>
                <input
                  type="number"
                  value={securitySettings.apiRateLimit}
                  onChange={(e) => setSecuritySettings({...securitySettings, apiRateLimit: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Data Retention (days)</label>
                <input
                  type="number"
                  value={securitySettings.dataRetentionDays}
                  onChange={(e) => setSecuritySettings({...securitySettings, dataRetentionDays: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">IP Whitelist</label>
              <textarea
                value={securitySettings.ipWhitelist}
                onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
                placeholder="Enter IP addresses separated by commas"
                rows={3}
                className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-gray-400 text-sm mt-1">Leave empty to allow all IPs</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Security Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Two-Factor Authentication</span>
                    <p className="text-gray-400 text-sm">Require 2FA for admin accounts</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({...securitySettings, twoFactorRequired: !securitySettings.twoFactorRequired})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.twoFactorRequired ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.twoFactorRequired ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Special Characters</span>
                    <p className="text-gray-400 text-sm">Require special chars in passwords</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({...securitySettings, passwordRequireSpecial: !securitySettings.passwordRequireSpecial})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.passwordRequireSpecial ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.passwordRequireSpecial ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Numbers Required</span>
                    <p className="text-gray-400 text-sm">Require numbers in passwords</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({...securitySettings, passwordRequireNumbers: !securitySettings.passwordRequireNumbers})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.passwordRequireNumbers ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.passwordRequireNumbers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Uppercase Required</span>
                    <p className="text-gray-400 text-sm">Require uppercase in passwords</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({...securitySettings, passwordRequireUppercase: !securitySettings.passwordRequireUppercase})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.passwordRequireUppercase ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.passwordRequireUppercase ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Audit Logging</span>
                    <p className="text-gray-400 text-sm">Log all admin actions</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({...securitySettings, enableAuditLog: !securitySettings.enableAuditLog})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.enableAuditLog ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.enableAuditLog ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'payments' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Payment Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Platform Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={paymentSettings.platformFee}
                  onChange={(e) => setPaymentSettings({...paymentSettings, platformFee: parseFloat(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Processing Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={paymentSettings.processingFee}
                  onChange={(e) => setPaymentSettings({...paymentSettings, processingFee: parseFloat(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Minimum Payout ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={paymentSettings.minimumPayout}
                  onChange={(e) => setPaymentSettings({...paymentSettings, minimumPayout: parseFloat(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Payout Schedule</label>
                <select
                  value={paymentSettings.payoutSchedule}
                  onChange={(e) => setPaymentSettings({...paymentSettings, payoutSchedule: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Currency</label>
                <select
                  value={paymentSettings.currency}
                  onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Refund Policy</label>
                <select
                  value={paymentSettings.refundPolicy}
                  onChange={(e) => setPaymentSettings({...paymentSettings, refundPolicy: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="flexible">Flexible</option>
                  <option value="moderate">Moderate</option>
                  <option value="strict">Strict</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Stripe</span>
                    <p className="text-gray-400 text-sm">Credit/debit card processing</p>
                  </div>
                  <button
                    onClick={() => setPaymentSettings({...paymentSettings, stripeEnabled: !paymentSettings.stripeEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      paymentSettings.stripeEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        paymentSettings.stripeEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">PayPal</span>
                    <p className="text-gray-400 text-sm">PayPal payment processing</p>
                  </div>
                  <button
                    onClick={() => setPaymentSettings({...paymentSettings, paypalEnabled: !paymentSettings.paypalEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      paymentSettings.paypalEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        paymentSettings.paypalEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Apple Pay</span>
                    <p className="text-gray-400 text-sm">Apple Pay integration</p>
                  </div>
                  <button
                    onClick={() => setPaymentSettings({...paymentSettings, applePay: !paymentSettings.applePay})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      paymentSettings.applePay ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        paymentSettings.applePay ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Google Pay</span>
                    <p className="text-gray-400 text-sm">Google Pay integration</p>
                  </div>
                  <button
                    onClick={() => setPaymentSettings({...paymentSettings, googlePay: !paymentSettings.googlePay})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      paymentSettings.googlePay ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        paymentSettings.googlePay ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Tax Calculation</span>
                    <p className="text-gray-400 text-sm">Automatic tax calculation</p>
                  </div>
                  <button
                    onClick={() => setPaymentSettings({...paymentSettings, taxCalculation: !paymentSettings.taxCalculation})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      paymentSettings.taxCalculation ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        paymentSettings.taxCalculation ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'email' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Email Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">SMTP Host</label>
                <input
                  type="text"
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">SMTP Port</label>
                <input
                  type="number"
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">SMTP Username</label>
                <input
                  type="text"
                  value={emailSettings.smtpUsername}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">SMTP Password</label>
                <input
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">From Name</label>
                <input
                  type="text"
                  value={emailSettings.fromName}
                  onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">From Email</label>
                <input
                  type="email"
                  value={emailSettings.fromEmail}
                  onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Reply-To Email</label>
                <input
                  type="email"
                  value={emailSettings.replyToEmail}
                  onChange={(e) => setEmailSettings({...emailSettings, replyToEmail: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Email Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Email Verification</span>
                    <p className="text-gray-400 text-sm">Require email verification for new users</p>
                  </div>
                  <button
                    onClick={() => setEmailSettings({...emailSettings, emailVerificationRequired: !emailSettings.emailVerificationRequired})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailSettings.emailVerificationRequired ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailSettings.emailVerificationRequired ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Welcome Emails</span>
                    <p className="text-gray-400 text-sm">Send welcome email to new users</p>
                  </div>
                  <button
                    onClick={() => setEmailSettings({...emailSettings, welcomeEmailEnabled: !emailSettings.welcomeEmailEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailSettings.welcomeEmailEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailSettings.welcomeEmailEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Event Reminders</span>
                    <p className="text-gray-400 text-sm">Send event reminder emails</p>
                  </div>
                  <button
                    onClick={() => setEmailSettings({...emailSettings, eventReminderEnabled: !emailSettings.eventReminderEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailSettings.eventReminderEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailSettings.eventReminderEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Marketing Emails</span>
                    <p className="text-gray-400 text-sm">Send promotional emails</p>
                  </div>
                  <button
                    onClick={() => setEmailSettings({...emailSettings, marketingEmailsEnabled: !emailSettings.marketingEmailsEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailSettings.marketingEmailsEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailSettings.marketingEmailsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={testEmailSettings}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Mail size={16} />
                <span>Send Test Email</span>
              </button>
            </div>
          </div>
        )}

        {settingsTab === 'api' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">API Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">API Version</label>
                <select
                  value={apiSettings.apiVersion}
                  onChange={(e) => setApiSettings({...apiSettings, apiVersion: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="v1">v1</option>
                  <option value="v2">v2 (Beta)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Rate Limit (requests/hour)</label>
                <input
                  type="number"
                  value={apiSettings.rateLimit}
                  onChange={(e) => setApiSettings({...apiSettings, rateLimit: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Webhook Secret</label>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    value={apiSettings.webhookSecret}
                    onChange={(e) => setApiSettings({...apiSettings, webhookSecret: e.target.value})}
                    className="flex-1 bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button 
                    onClick={generateApiKey}
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">CORS Origins</label>
                <input
                  type="text"
                  value={apiSettings.corsOrigins}
                  onChange={(e) => setApiSettings({...apiSettings, corsOrigins: e.target.value})}
                  placeholder="https://example.com, https://app.example.com"
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">API Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">API Access</span>
                    <p className="text-gray-400 text-sm">Enable API endpoints</p>
                  </div>
                  <button
                    onClick={() => setApiSettings({...apiSettings, apiEnabled: !apiSettings.apiEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      apiSettings.apiEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        apiSettings.apiEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Webhooks</span>
                    <p className="text-gray-400 text-sm">Enable webhook notifications</p>
                  </div>
                  <button
                    onClick={() => setApiSettings({...apiSettings, webhooksEnabled: !apiSettings.webhooksEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      apiSettings.webhooksEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        apiSettings.webhooksEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">API Documentation</span>
                    <p className="text-gray-400 text-sm">Public API documentation</p>
                  </div>
                  <button
                    onClick={() => setApiSettings({...apiSettings, apiDocumentation: !apiSettings.apiDocumentation})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      apiSettings.apiDocumentation ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        apiSettings.apiDocumentation ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Deprecation Notices</span>
                    <p className="text-gray-400 text-sm">Send API deprecation warnings</p>
                  </div>
                  <button
                    onClick={() => setApiSettings({...apiSettings, deprecationNotices: !apiSettings.deprecationNotices})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      apiSettings.deprecationNotices ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        apiSettings.deprecationNotices ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">API Keys</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Production Key</span>
                    <p className="text-gray-400 text-sm">sk_prod_••••••••••••••••</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                      <Copy size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Test Key</span>
                    <p className="text-gray-400 text-sm">sk_test_••••••••••••••••</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                      <Copy size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'backup' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Backup & Recovery</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Backup Frequency</label>
                <select
                  value={backupSettings.backupFrequency}
                  onChange={(e) => setBackupSettings({...backupSettings, backupFrequency: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Retention Period (days)</label>
                <input
                  type="number"
                  value={backupSettings.backupRetention}
                  onChange={(e) => setBackupSettings({...backupSettings, backupRetention: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Backup Location</label>
                <select
                  value={backupSettings.backupLocation}
                  onChange={(e) => setBackupSettings({...backupSettings, backupLocation: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="aws-s3">AWS S3</option>
                  <option value="google-cloud">Google Cloud Storage</option>
                  <option value="azure-blob">Azure Blob Storage</option>
                  <option value="local">Local Storage</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Backup Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Auto Backup</span>
                    <p className="text-gray-400 text-sm">Automatic scheduled backups</p>
                  </div>
                  <button
                    onClick={() => setBackupSettings({...backupSettings, autoBackupEnabled: !backupSettings.autoBackupEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      backupSettings.autoBackupEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        backupSettings.autoBackupEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Encrypt Backups</span>
                    <p className="text-gray-400 text-sm">Encrypt backup files</p>
                  </div>
                  <button
                    onClick={() => setBackupSettings({...backupSettings, encryptBackups: !backupSettings.encryptBackups})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      backupSettings.encryptBackups ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        backupSettings.encryptBackups ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Backup Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Last Backup</p>
                  <p className="text-white font-medium">{backupSettings.lastBackup}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Backup Size</p>
                  <p className="text-white font-medium">{backupSettings.backupSize}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Next Backup</p>
                  <p className="text-white font-medium">{backupSettings.nextBackup}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-green-400 font-medium">Healthy</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={triggerBackup}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <CloudUpload size={16} />
                <span>Trigger Backup Now</span>
              </button>
              
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
                <Download size={16} />
                <span>Download Latest Backup</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render different sections based on activeSection
  switch (activeSection) {
    case 'overview':
      return renderOverview();
    case 'events':
      return renderEvents();
    case 'users':
      return renderUsers();
    case 'analytics':
      return renderAnalytics();
    case 'notifications':
      return renderNotifications();
    case 'settings':
      return renderSettings();
    default:
      return renderOverview();
  }
};