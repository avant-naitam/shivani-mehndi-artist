import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Phone,
  User as UserIcon,
  Search,
  Trash2,
  Mail,
  RefreshCw,
  MessageSquareQuote,
  Database,
  CalendarCheck,
  Lock,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Users,
  UserPlus,
  ShieldAlert,
  CheckCircle2,
  Crown,
  Briefcase,
  UserX,
} from 'lucide-react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import {
  BookingRequest,
  BookingStatus,
  ContactInquiry,
  InquiryStatus,
  AdminRecord,
  AdminRole,
  AdminStatus,
} from '../types';
import {
  updateBookingStatus,
  deleteBookingRequest,
  getInquiriesFromDb,
  updateInquiryStatusInDb,
  deleteInquiryFromDb,
} from '../services/bookingStorage';
import {
  checkUserAdminRole,
  getAuthorizedAdmins,
  addAuthorizedAdmin,
  updateAdminStatus,
  updateAdminRole,
  removeAuthorizedAdmin,
  PRIMARY_OWNER_EMAIL,
} from '../services/adminService';

interface AdminBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRequest[];
  onRefresh: () => void;
}

export const AdminBookingsModal: React.FC<AdminBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onRefresh,
}) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Role & Authorization State
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [roleChecking, setRoleChecking] = useState<boolean>(false);

  // Portal View Tabs
  const [activeTab, setActiveTab] = useState<'inquiries' | 'bookings' | 'admins'>('inquiries');

  // Inquiries State
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [inquiryFilter, setInquiryFilter] = useState<'All' | InquiryStatus>('All');
  const [bookingFilter, setBookingFilter] = useState<'All' | BookingStatus>('All');
  const [search, setSearch] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  // Admin Management State (Owner Only)
  const [adminsList, setAdminsList] = useState<AdminRecord[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>('Business Admin');
  const [adminActionLoading, setAdminActionLoading] = useState(false);
  const [adminMgmtError, setAdminMgmtError] = useState('');
  const [adminMgmtSuccess, setAdminMgmtSuccess] = useState('');

  // Check admin authorization & role
  const verifyAdminAndLoad = async (userEmail: string) => {
    setRoleChecking(true);
    try {
      const { isAuthorized: authOk, role } = await checkUserAdminRole(userEmail);
      setIsAuthorized(authOk);
      setAdminRole(role);

      if (authOk) {
        fetchInquiries();
        if (role === 'Owner') {
          loadAdmins();
        }
      }
    } catch (err) {
      console.error('Role verification error:', err);
      setIsAuthorized(false);
      setAdminRole(null);
    } finally {
      setRoleChecking(false);
    }
  };

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthChecking(false);

      if (user && isOpen) {
        if (user.email) {
          await verifyAdminAndLoad(user.email);
        } else {
          setIsAuthorized(false);
        }
      } else if (!user) {
        setInquiries([]);
        setAdminsList([]);
        setIsAuthorized(null);
        setAdminRole(null);
      }
    });

    return () => unsubscribe();
  }, [isOpen]);

  const fetchInquiries = async () => {
    if (!auth.currentUser) return;
    setLoadingInquiries(true);
    try {
      const data = await getInquiriesFromDb();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries from Firestore:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const loadAdmins = async () => {
    setLoadingAdmins(true);
    try {
      const data = await getAuthorizedAdmins();
      setAdminsList(data);
    } catch (err) {
      console.error('Failed to fetch authorized admins:', err);
    } finally {
      setLoadingAdmins(false);
    }
  };

  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthSuccessMsg('');
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setCurrentUser(user);
      setAuthSuccessMsg('Google authentication successful.');
      if (user.email) {
        await verifyAdminAndLoad(user.email);
      }
    } catch (err: any) {
      console.error('Google Sign-In error:', err);
      const code = err?.code || '';
      if (code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed. Please try again.');
      } else if (code === 'auth/popup-blocked') {
        setAuthError('Sign-in popup was blocked by your browser. Please allow popups for this site.');
      } else if (code === 'auth/cancelled-popup-request') {
        setAuthError('Only one sign-in window can be open at a time.');
      } else {
        setAuthError(err?.message || 'Google authentication failed. Please try again or use email/password.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const [resetLoading, setResetLoading] = useState(false);

  const handlePasswordReset = async () => {
    setAuthError('');
    setAuthSuccessMsg('');
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setAuthError('Please enter your admin email address first, then click "Forgot password?".');
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      setAuthSuccessMsg(`Password reset link sent to ${cleanEmail}. Check your inbox or spam folder.`);
    } catch (err: any) {
      console.error('Password reset error:', err);
      const code = err?.code || '';
      if (code === 'auth/user-not-found') {
        setAuthError('No admin account found with this email in Firebase Authentication.');
      } else if (code === 'auth/invalid-email') {
        setAuthError('Please enter a valid email address.');
      } else if (code === 'auth/operation-not-allowed') {
        setAuthError('Email/Password provider is not yet enabled in Firebase Authentication.');
      } else {
        setAuthError(err?.message || 'Failed to send password reset email. Please try again.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setAuthError('Please provide both your authorized admin email address and password.');
      return;
    }

    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const user = userCredential.user;
      setCurrentUser(user);
      setAuthSuccessMsg('Authentication successful.');
      setEmail('');
      setPassword('');

      if (user.email) {
        await verifyAdminAndLoad(user.email);
      }
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      const code = err?.code || '';
      if (code === 'auth/operation-not-allowed') {
        setAuthError('Email/Password provider is currently disabled in your Firebase project. Please enable it in the Firebase Console (Sign-in method tab) or sign in using Google.');
      } else if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        setAuthError('Invalid admin email or password. Access is restricted to authorized studio personnel.');
      } else if (code === 'auth/invalid-email') {
        setAuthError('Please enter a valid email address.');
      } else if (code === 'auth/too-many-requests') {
        setAuthError('Too many failed attempts. Please wait a few moments before trying again, or use "Forgot password?".');
      } else {
        setAuthError(err?.message || 'Authentication failed. Please verify your credentials and try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsAuthorized(null);
      setAdminRole(null);
      setInquiries([]);
      setAdminsList([]);
      setActiveTab('inquiries');
      setAuthError('');
      setAuthSuccessMsg('');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Owner action: Add new admin
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminMgmtError('');
    setAdminMgmtSuccess('');

    if (!newAdminEmail.trim()) {
      setAdminMgmtError('Please enter a valid email address for the admin.');
      return;
    }

    const cleanEmail = newAdminEmail.trim().toLowerCase();
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setAdminMgmtError('Please enter a valid email address format.');
      return;
    }

    setAdminActionLoading(true);
    try {
      await addAuthorizedAdmin(
        cleanEmail,
        newAdminRole,
        currentUser?.email || PRIMARY_OWNER_EMAIL
      );
      setAdminMgmtSuccess(`Successfully authorized ${cleanEmail} as ${newAdminRole}.`);
      setNewAdminEmail('');
      setNewAdminRole('Business Admin');
      await loadAdmins();
    } catch (err: any) {
      console.error('Error adding admin:', err);
      setAdminMgmtError(err?.message || 'Failed to authorize admin. Please try again.');
    } finally {
      setAdminActionLoading(false);
    }
  };

  // Owner action: Toggle admin status (Active / Revoked)
  const handleToggleAdminStatus = async (targetEmail: string, currentStatus: AdminStatus) => {
    const nextStatus: AdminStatus = currentStatus === 'Active' ? 'Revoked' : 'Active';
    const actionLabel = nextStatus === 'Revoked' ? 'revoke access for' : 'restore access for';
    if (!confirm(`Are you sure you want to ${actionLabel} ${targetEmail}?`)) return;

    try {
      await updateAdminStatus(targetEmail, nextStatus);
      setAdminsList((prev) =>
        prev.map((a) => (a.email.toLowerCase() === targetEmail.toLowerCase() ? { ...a, status: nextStatus } : a))
      );
      setAdminMgmtSuccess(`Updated status for ${targetEmail} to ${nextStatus}.`);
    } catch (err: any) {
      console.error('Error updating admin status:', err);
      setAdminMgmtError('Failed to update admin status.');
    }
  };

  // Owner action: Change admin role
  const handleChangeAdminRole = async (targetEmail: string, newRole: AdminRole) => {
    try {
      await updateAdminRole(targetEmail, newRole);
      setAdminsList((prev) =>
        prev.map((a) => (a.email.toLowerCase() === targetEmail.toLowerCase() ? { ...a, role: newRole } : a))
      );
      setAdminMgmtSuccess(`Updated role for ${targetEmail} to ${newRole}.`);
    } catch (err: any) {
      console.error('Error updating admin role:', err);
      setAdminMgmtError('Failed to update admin role.');
    }
  };

  // Owner action: Remove admin
  const handleRemoveAdmin = async (targetEmail: string) => {
    if (targetEmail.toLowerCase() === PRIMARY_OWNER_EMAIL.toLowerCase()) {
      alert('The primary Owner account cannot be removed.');
      return;
    }
    if (!confirm(`Permanently remove ${targetEmail} from authorized admins?`)) return;

    try {
      await removeAuthorizedAdmin(targetEmail);
      setAdminsList((prev) => prev.filter((a) => a.email.toLowerCase() !== targetEmail.toLowerCase()));
      setAdminMgmtSuccess(`Removed ${targetEmail} from authorized admins.`);
    } catch (err: any) {
      console.error('Error removing admin:', err);
      setAdminMgmtError('Failed to remove admin.');
    }
  };

  if (!isOpen) return null;

  // Filtered Client Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const statusMatches = inquiryFilter === 'All' ? true : inq.status === inquiryFilter;
    const nameStr = (inq.fullName || inq.name || '').toLowerCase();
    const phoneStr = (inq.phoneNumber || inq.phone || '');
    const msgStr = (inq.message || '').toLowerCase();
    const q = search.toLowerCase();
    const searchMatches = nameStr.includes(q) || phoneStr.includes(q) || msgStr.includes(q);
    return statusMatches && searchMatches;
  });

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = bookingFilter === 'All' ? true : b.status === bookingFilter;
    const matchesSearch =
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.phoneNumber.includes(search) ||
      b.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      b.eventType.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleInquiryStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setIsUpdatingStatus(id);
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    try {
      await updateInquiryStatusInDb(id, newStatus);
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleInquiryDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this client inquiry?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      await deleteInquiryFromDb(id);
    }
  };

  const handleBookingStatusChange = (id: string, newStatus: BookingStatus) => {
    updateBookingStatus(id, newStatus);
    onRefresh();
  };

  const handleBookingDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this booking request?')) {
      deleteBookingRequest(id);
      onRefresh();
    }
  };

  const getStatusColor = (status: InquiryStatus | BookingStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Completed':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString;
      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D1D1E]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF7F2] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-[#EADBCE] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FFFDFB] border-b border-[#EADBCE] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl sm:text-2xl text-[#4A0E1B] font-medium">
                Artist Portal · Review Requests
              </h3>
              {currentUser && isAuthorized && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {adminRole === 'Owner' ? 'Owner / Super Admin' : 'Business Admin'}
                </span>
              )}
            </div>
            <p className="text-xs text-[#7A6461] mt-0.5">
              {currentUser && isAuthorized
                ? 'Review inquiries, bookings, and studio administration.'
                : 'Restricted administrative area. Please sign in to continue.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {currentUser && isAuthorized && (
              <>
                <button
                  onClick={() => {
                    fetchInquiries();
                    onRefresh();
                    if (adminRole === 'Owner') loadAdmins();
                  }}
                  title="Refresh data from database"
                  disabled={loadingInquiries || loadingAdmins}
                  className="p-2 text-[#7A6461] hover:text-[#4A0E1B] hover:bg-[#F2ECE3] rounded-lg transition-colors cursor-pointer"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${
                      loadingInquiries || loadingAdmins ? 'animate-spin' : ''
                    }`}
                  />
                </button>
                <button
                  onClick={handleSignOut}
                  title="Sign out of Admin Portal"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#7A6461] hover:text-[#4A0E1B] hover:bg-[#F2ECE3] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTH CHECKING / ROLE CHECKING LOADER */}
        {authChecking || roleChecking ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#6D182B] animate-spin mb-3" />
            <p className="text-xs text-[#7A6461] font-medium">Verifying admin credentials & role...</p>
          </div>
        ) : !currentUser ? (
          /* ========================================================= */
          /* 1. AUTHENTICATION REQUIRED VIEW (UNAUTHENTICATED)         */
          /* ========================================================= */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-center justify-center">
            <div className="w-full max-w-md bg-[#FFFDFB] p-6 sm:p-8 rounded-2xl border border-[#EADBCE] shadow-xs">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#6D182B] flex items-center justify-center mx-auto mb-3 border border-[#EADBCE]">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-[#4A0E1B] font-medium">
                  Admin Portal Sign In
                </h4>
                <p className="text-xs text-[#7A6461] mt-1">
                  Access is restricted to authorized studio personnel. Unauthenticated visitors cannot view client inquiries or booking data.
                </p>
              </div>

              {authError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccessMsg && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              {/* 1-Click Google Sign-In for Owner & Admins */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={authLoading || googleLoading}
                className="w-full mb-4 inline-flex items-center justify-center gap-3 bg-white hover:bg-[#FAF7F2] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-[#2D1D1E] text-xs uppercase tracking-wider font-semibold py-3 px-4 rounded-xl shadow-2xs border border-[#EADBCE] transition-all cursor-pointer group"
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#6D182B] animate-spin" />
                    <span>Signing in with Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Sign In with Google</span>
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-[#EADBCE] w-full" />
                <span className="bg-[#FFFDFB] px-3 text-[11px] uppercase tracking-wider text-[#8C6D62] font-semibold whitespace-nowrap">
                  Or with email & password
                </span>
                <div className="border-t border-[#EADBCE] w-full" />
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="adminEmail"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-1.5"
                  >
                    Admin Email Address <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C6D62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="adminEmail"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your admin email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={authLoading}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D182B] text-[#2D1D1E] disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="adminPassword"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-1.5"
                  >
                    Password <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#8C6D62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="adminPassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={authLoading}
                      className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D182B] text-[#2D1D1E] disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C6D62] hover:text-[#4A0E1B] p-1 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      disabled={authLoading || resetLoading}
                      className="text-[11px] text-[#6D182B] hover:text-[#4A0E1B] hover:underline font-medium cursor-pointer disabled:opacity-60"
                    >
                      {resetLoading ? 'Sending reset link...' : 'Forgot password?'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-[#FFFDFB] text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-xl shadow-2xs transition-all cursor-pointer mt-2"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#DFC493] animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#DFC493]" />
                      <span>Sign In with Email & Password</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-[#F2ECE3] text-[11px] text-[#8C6D62] text-center">
                <span>Directly secured via Firebase Authentication & Firestore Security Rules.</span>
              </div>
            </div>
          </div>
        ) : !isAuthorized ? (
          /* ========================================================= */
          /* 2. AUTHENTICATED BUT NOT AUTHORIZED (ACCESS DENIED)       */
          /* ========================================================= */
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center">
            <div className="w-full max-w-md bg-[#FFFDFB] p-8 rounded-2xl border border-rose-200 text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl text-[#4A0E1B] font-medium mb-2">
                Access Denied
              </h4>
              <p className="text-xs text-[#5A4543] mb-4 leading-relaxed">
                You are authenticated as <span className="font-semibold text-[#2D1D1E]">{currentUser.email}</span>,
                but this account is not registered as an authorized administrator.
              </p>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCE] text-[11px] text-[#7A6461] mb-6">
                Please contact the studio owner to authorize your email address in the Admin Management section.
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#5A4543] hover:text-[#2D1D1E] bg-[#F2ECE3] hover:bg-[#EADBCE] rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* 3. AUTHORIZED ADMIN PORTAL VIEW                           */
          /* ========================================================= */
          <>
            {/* Navigation Tabs between Client Inquiries, Bookings, and Admin Management */}
            <div className="px-6 pt-3 bg-[#FAF7F2] border-b border-[#EADBCE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'inquiries'
                      ? 'border-[#6D182B] text-[#6D182B]'
                      : 'border-transparent text-[#7A6461] hover:text-[#4A0E1B]'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Client Inquiries</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeTab === 'inquiries'
                        ? 'bg-[#6D182B] text-white'
                        : 'bg-[#EADBCE] text-[#4A0E1B]'
                    }`}
                  >
                    {inquiries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'bookings'
                      ? 'border-[#6D182B] text-[#6D182B]'
                      : 'border-transparent text-[#7A6461] hover:text-[#4A0E1B]'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Booking Requests</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeTab === 'bookings'
                        ? 'bg-[#6D182B] text-white'
                        : 'bg-[#EADBCE] text-[#4A0E1B]'
                    }`}
                  >
                    {bookings.length}
                  </span>
                </button>

                {/* Admin Management Tab: VISIBLE ONLY TO OWNER */}
                {adminRole === 'Owner' && (
                  <button
                    onClick={() => setActiveTab('admins')}
                    className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      activeTab === 'admins'
                        ? 'border-[#6D182B] text-[#6D182B]'
                        : 'border-transparent text-[#7A6461] hover:text-[#4A0E1B]'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Admin Management</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        activeTab === 'admins'
                          ? 'bg-[#6D182B] text-white'
                          : 'bg-[#EADBCE] text-[#4A0E1B]'
                      }`}
                    >
                      {adminsList.length}
                    </span>
                  </button>
                )}
              </div>

              {/* Admin Session Badge */}
              <div className="pb-3 sm:pb-2.5 flex items-center gap-1.5 text-xs text-[#7A6461]">
                {adminRole === 'Owner' ? (
                  <Crown className="w-3.5 h-3.5 text-[#C59D5F]" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 text-[#6D182B]" />
                )}
                <span
                  className="font-medium text-[#2D1D1E] truncate max-w-[180px] sm:max-w-[220px]"
                  title={currentUser.email || ''}
                >
                  {currentUser.email}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF0E6] text-[#6D182B] border border-[#EADBCE] font-semibold">
                  {adminRole}
                </span>
              </div>
            </div>

            {/* TAB CONTENT */}
            {activeTab === 'admins' && adminRole === 'Owner' ? (
              /* ========================================================= */
              /* ADMIN MANAGEMENT VIEW (OWNER ONLY)                       */
              /* ========================================================= */
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Intro & Summary */}
                <div className="bg-[#FFFDFB] p-5 rounded-xl border border-[#EADBCE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg text-[#4A0E1B] font-medium flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#C59D5F]" />
                      Authorized Studio Administrators
                    </h4>
                    <p className="text-xs text-[#7A6461] mt-0.5">
                      Grant access to studio team members. Business Admins can manage inquiries and bookings, but cannot modify administrator accounts.
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shrink-0">
                    Owner Access Active
                  </div>
                </div>

                {/* Add Admin Form */}
                <div className="bg-[#FFFDFB] p-5 sm:p-6 rounded-xl border border-[#EADBCE] shadow-2xs">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-3 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#C59D5F]" />
                    Authorize New Administrator
                  </h5>

                  {adminMgmtError && (
                    <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{adminMgmtError}</span>
                    </div>
                  )}

                  {adminMgmtSuccess && (
                    <div className="p-3 mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{adminMgmtSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-semibold text-[#7A6461] uppercase tracking-wider mb-1">
                        Admin Email Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter admin email address"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        disabled={adminActionLoading}
                        className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCE] rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6D182B] text-[#2D1D1E]"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-semibold text-[#7A6461] uppercase tracking-wider mb-1">
                        Assign Role <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={newAdminRole}
                        onChange={(e) => setNewAdminRole(e.target.value as AdminRole)}
                        disabled={adminActionLoading}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCE] rounded-lg font-medium text-[#4A0E1B] focus:outline-none focus:ring-1 focus:ring-[#6D182B] cursor-pointer"
                      >
                        <option value="Business Admin">Business Admin (Inquiries & Bookings)</option>
                        <option value="Owner">Owner / Super Admin (Full Access)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={adminActionLoading}
                        className="w-full py-2 px-4 bg-[#6D182B] hover:bg-[#50101E] disabled:opacity-60 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {adminActionLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DFC493]" />
                        ) : (
                          <UserPlus className="w-3.5 h-3.5 text-[#DFC493]" />
                        )}
                        <span>Add Admin</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Admins Table / List */}
                <div className="bg-[#FFFDFB] rounded-xl border border-[#EADBCE] shadow-2xs overflow-hidden">
                  <div className="px-5 py-3.5 bg-[#FAF7F2] border-b border-[#EADBCE] flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4A0E1B]">
                      Active Administrator Accounts ({adminsList.length})
                    </span>
                    <span className="text-[11px] text-[#7A6461]">
                      Stored in Firestore <code className="text-[#6D182B]">admins</code> collection
                    </span>
                  </div>

                  {adminsList.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#7A6461]">
                      No administrator accounts found.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#F2ECE3]">
                      {adminsList.map((admin) => {
                        const isSelf = admin.email.toLowerCase() === currentUser?.email?.toLowerCase();
                        const isPrimary = admin.email.toLowerCase() === PRIMARY_OWNER_EMAIL.toLowerCase();

                        return (
                          <div
                            key={admin.email}
                            className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF7F2]/50 transition-colors"
                          >
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-sm text-[#2D1D1E]">
                                  {admin.email}
                                </span>
                                {isSelf && (
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF0E6] text-[#6D182B] border border-[#EADBCE] font-bold">
                                    You
                                  </span>
                                )}
                                <span
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                                    admin.role === 'Owner'
                                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                                      : 'bg-amber-50 text-amber-800 border-amber-200'
                                  }`}
                                >
                                  {admin.role}
                                </span>
                                <span
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                                    admin.status === 'Active'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : 'bg-rose-50 text-rose-800 border-rose-200'
                                  }`}
                                >
                                  {admin.status}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#7A6461]">
                                <span>Authorized: {formatDateTime(admin.addedAt)}</span>
                                {admin.addedBy && (
                                  <>
                                    <span>·</span>
                                    <span>Granted by: {admin.addedBy}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Actions (Role change, Revoke/Restore, Remove) */}
                            {!isPrimary && !isSelf && (
                              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F2ECE3]">
                                <select
                                  value={admin.role}
                                  onChange={(e) => handleChangeAdminRole(admin.email, e.target.value as AdminRole)}
                                  className="text-xs bg-[#FAF7F2] border border-[#EADBCE] rounded-lg px-2.5 py-1.5 font-medium text-[#4A0E1B] focus:outline-none focus:ring-1 focus:ring-[#6D182B] cursor-pointer"
                                  title="Change administrator role"
                                >
                                  <option value="Business Admin">Business Admin</option>
                                  <option value="Owner">Owner / Super Admin</option>
                                </select>

                                <button
                                  onClick={() => handleToggleAdminStatus(admin.email, admin.status)}
                                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                                    admin.status === 'Active'
                                      ? 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                  }`}
                                  title={admin.status === 'Active' ? 'Revoke access for this admin' : 'Restore access for this admin'}
                                >
                                  {admin.status === 'Active' ? (
                                    <>
                                      <UserX className="w-3.5 h-3.5 text-rose-600" />
                                      <span>Revoke Access</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Restore Access</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => handleRemoveAdmin(admin.email)}
                                  className="p-1.5 text-[#A37D36] hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Permanently remove admin record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ========================================================= */
              /* INQUIRIES OR BOOKINGS VIEW                                */
              /* ========================================================= */
              <>
                {/* Search & Filter Toolbar */}
                <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#EADBCE] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-[#8C6D62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={
                        activeTab === 'inquiries'
                          ? 'Search inquiries by name, phone, or message...'
                          : 'Search bookings by name, phone, or service...'
                      }
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFDFB] border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6D182B] text-[#2D1D1E]"
                    />
                  </div>

                  {/* Filter segment control */}
                  <div className="flex items-center gap-1 bg-[#F2ECE3] p-1 rounded-lg overflow-x-auto">
                    {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => {
                      const currentFilter = activeTab === 'inquiries' ? inquiryFilter : bookingFilter;
                      const count =
                        activeTab === 'inquiries'
                          ? st === 'All'
                            ? inquiries.length
                            : inquiries.filter((i) => i.status === st).length
                          : st === 'All'
                          ? bookings.length
                          : bookings.filter((b) => b.status === st).length;

                      return (
                        <button
                          key={st}
                          onClick={() => {
                            if (activeTab === 'inquiries') {
                              setInquiryFilter(st);
                            } else {
                              setBookingFilter(st);
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                            currentFilter === st
                              ? 'bg-[#FFFDFB] text-[#6D182B] shadow-2xs font-semibold'
                              : 'text-[#6A5754] hover:text-[#2D1D1E]'
                          }`}
                        >
                          {st}
                          <span className="ml-1.5 opacity-60 text-[10px]">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
                  {activeTab === 'inquiries' ? (
                    /* CLIENT INQUIRIES LIST (CONTACT FORM) */
                    filteredInquiries.length === 0 ? (
                      <div className="text-center py-12 bg-[#FFFDFB] rounded-xl border border-[#EADBCE]">
                        <MessageSquareQuote className="w-8 h-8 text-[#C59D5F] mx-auto mb-2 opacity-60" />
                        <p className="text-sm font-medium text-[#5A4543]">No client inquiries found</p>
                        <p className="text-xs text-[#8C6D62] mt-1 max-w-md mx-auto">
                          When visitors submit the Send Inquiry form on the Contact section, their requests
                          are securely stored in Firestore and will appear here with initial 'Pending' status.
                        </p>
                      </div>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="bg-[#FFFDFB] p-5 rounded-xl border border-[#EADBCE] shadow-2xs hover:border-[#C59D5F]/60 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                          <div className="space-y-2.5 flex-1 min-w-0">
                            {/* Client Name & Status Badge */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono font-medium text-[#7A6461]">
                                {inq.id.startsWith('INQ-') ? inq.id : inq.id.slice(0, 8)}
                              </span>
                              <span className="text-[#D9C8BE]" aria-hidden="true">·</span>
                              <h4 className="text-base font-serif font-medium text-[#4A0E1B]">
                                {inq.fullName || inq.name}
                              </h4>
                              <span
                                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${getStatusColor(
                                  inq.status
                                )}`}
                              >
                                {inq.status}
                              </span>
                            </div>

                            {/* Phone number and Date & Time */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A4543]">
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#C59D5F]" />
                                <a
                                  href={`tel:${inq.phoneNumber || inq.phone}`}
                                  className="hover:underline font-medium text-[#2D1D1E]"
                                >
                                  {inq.phoneNumber || inq.phone}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5 text-[#7A6461]">
                                <Clock className="w-3.5 h-3.5 text-[#C59D5F]" />
                                <span>{formatDateTime(inq.createdAt)}</span>
                              </div>
                            </div>

                            {/* Inquiry Message */}
                            <div className="text-xs text-[#5A4543] bg-[#FAF7F2] p-3 rounded-lg border border-[#F2ECE3] leading-relaxed">
                              <span className="font-semibold text-[#4A0E1B] block mb-0.5 uppercase tracking-wider text-[10px]">
                                Client Message
                              </span>
                              <p className="whitespace-pre-wrap">{inq.message}</p>
                            </div>
                          </div>

                          {/* Status update dropdown control */}
                          <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F2ECE3]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-medium text-[#7A6461]">Status:</span>
                              <select
                                value={inq.status}
                                disabled={isUpdatingStatus === inq.id}
                                onChange={(e) =>
                                  handleInquiryStatusChange(inq.id, e.target.value as InquiryStatus)
                                }
                                aria-label={`Change status for inquiry ${inq.id}`}
                                className="text-xs bg-[#FAF7F2] border border-[#EADBCE] rounded-md px-2.5 py-1 font-semibold text-[#4A0E1B] focus:outline-none focus:ring-1 focus:ring-[#6D182B] cursor-pointer disabled:opacity-60"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>

                            <button
                              onClick={() => handleInquiryDelete(inq.id)}
                              className="p-1.5 text-[#A37D36] hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="Remove Inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    /* BOOKING REQUESTS LIST */
                    filteredBookings.length === 0 ? (
                      <div className="text-center py-12 bg-[#FFFDFB] rounded-xl border border-[#EADBCE]">
                        <p className="text-sm font-medium text-[#5A4543]">No booking requests found</p>
                        <p className="text-xs text-[#8C6D62] mt-1">
                          New customer booking submissions will appear here with initial 'Pending' status.
                        </p>
                      </div>
                    ) : (
                      filteredBookings.map((b) => (
                        <div
                          key={b.id}
                          className="bg-[#FFFDFB] p-5 rounded-xl border border-[#EADBCE] shadow-2xs hover:border-[#C59D5F]/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono font-medium text-[#7A6461]">{b.id}</span>
                              <span className="text-[#D9C8BE]" aria-hidden="true">·</span>
                              <h4 className="text-base font-serif font-medium text-[#4A0E1B]">
                                {b.fullName}
                              </h4>
                              <span
                                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${getStatusColor(
                                  b.status
                                )}`}
                              >
                                {b.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-[#5A4543]">
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#C59D5F]" />
                                <a href={`tel:${b.phoneNumber}`} className="hover:underline font-medium">
                                  {b.phoneNumber}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#C59D5F]" />
                                <span>
                                  {b.preferredDate} ({b.preferredTime})
                                </span>
                              </div>
                              <div className="text-[#6D182B] font-medium">{b.serviceType}</div>
                            </div>

                            <div className="text-xs text-[#7A6461] bg-[#FAF7F2] p-2.5 rounded-lg border border-[#F2ECE3]">
                              <span className="font-medium text-[#4A0E1B]">Event:</span> {b.eventType}
                              {b.message && <p className="mt-1 text-[#5A4543] italic">"{b.message}"</p>}
                            </div>
                          </div>

                          {/* Status action control */}
                          <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F2ECE3]">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-[#7A6461] mr-1">Status:</span>
                              <select
                                value={b.status}
                                onChange={(e) => handleBookingStatusChange(b.id, e.target.value as BookingStatus)}
                                aria-label={`Change status for booking ${b.id}`}
                                className="text-xs bg-[#FAF7F2] border border-[#EADBCE] rounded-md px-2 py-1 font-medium text-[#4A0E1B] focus:outline-none focus:ring-1 focus:ring-[#6D182B] cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>

                            <button
                              onClick={() => handleBookingDelete(b.id)}
                              className="p-1.5 text-[#A37D36] hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="Delete Request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-[#FFFDFB] border-t border-[#EADBCE] text-xs text-[#7A6461] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                currentUser && isAuthorized ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            ></span>
            <span>
              {currentUser && isAuthorized
                ? `Role: ${adminRole} · Firestore Connected`
                : 'Authentication Required · Access Restricted'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6D182B] hover:text-[#50101E] cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
