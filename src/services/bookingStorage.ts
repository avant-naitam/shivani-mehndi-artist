import { BookingRequest, BookingStatus, ContactInquiry, InquiryStatus, ServiceType } from '../types';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';

const STORAGE_KEY = 'shivani_mehndi_bookings_v1';
const INQUIRIES_KEY = 'shivani_mehndi_inquiries_v1';

export function getStoredBookings(): BookingRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial sample request for admin review demonstration
      const initial: BookingRequest[] = [
        {
          id: 'REQ-1042',
          fullName: 'Pooja Deshmukh',
          phoneNumber: '9823011245',
          serviceType: 'Bridal Mehndi',
          eventType: 'Traditional Maharashtrian Wedding',
          preferredDate: '2026-10-18',
          preferredTime: '11:00 AM',
          message: 'Looking for full bridal hands up to elbows and delicate foot mehndi with peacock motifs.',
          status: 'Pending',
          createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        },
        {
          id: 'REQ-1041',
          fullName: 'Anjali Sharma',
          phoneNumber: '9422891040',
          serviceType: 'Engagement Mehndi',
          eventType: 'Ring Ceremony',
          preferredDate: '2026-10-05',
          preferredTime: '04:00 PM',
          message: 'Prefer Arabic floral negative space style on both hands.',
          status: 'Confirmed',
          createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading bookings from localStorage:', err);
    return [];
  }
}

export function saveBookingRequest(
  data: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>
): BookingRequest {
  const current = getStoredBookings();
  const newBooking: BookingRequest = {
    ...data,
    id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Pending', // Strictly initial status: Pending
    createdAt: new Date().toISOString(),
  };

  const updated = [newBooking, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving booking to localStorage:', err);
  }

  return newBooking;
}

export function updateBookingStatus(id: string, status: BookingStatus): boolean {
  const current = getStoredBookings();
  const idx = current.findIndex((b) => b.id === id);
  if (idx === -1) return false;

  current[idx].status = status;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  } catch (err) {
    console.error('Error updating booking status:', err);
    return false;
  }
}

export function deleteBookingRequest(id: string): boolean {
  const current = getStoredBookings();
  const filtered = current.filter((b) => b.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error deleting booking:', err);
    return false;
  }
}

export function getStoredInquiries(): ContactInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Save client inquiry to Firebase Firestore with initial status "Pending"
 * Also saves locally for instant resilience. Throws on failure.
 */
export async function saveContactInquiryToDb(data: {
  fullName: string;
  phoneNumber: string;
  message: string;
}): Promise<ContactInquiry> {
  const timestamp = new Date().toISOString();
  const inquiryData = {
    fullName: data.fullName.trim(),
    phoneNumber: data.phoneNumber.trim(),
    message: data.message.trim(),
    status: 'Pending' as InquiryStatus,
    createdAt: timestamp,
  };

  // 1. Save to Firestore collection 'inquiries'
  const docRef = await addDoc(collection(db, 'inquiries'), inquiryData);

  const newInquiry: ContactInquiry = {
    id: docRef.id,
    ...inquiryData,
    name: inquiryData.fullName,
    phone: inquiryData.phoneNumber,
  };

  // 2. Cache in localStorage
  try {
    const current = getStoredInquiries();
    localStorage.setItem(
      INQUIRIES_KEY,
      JSON.stringify([newInquiry, ...current.filter((i) => i.id !== newInquiry.id)])
    );
  } catch (err) {
    console.warn('Error caching inquiry in localStorage:', err);
  }

  return newInquiry;
}

/**
 * Fetch all client inquiries from Firestore, sorted newest first.
 */
export async function getInquiriesFromDb(): Promise<ContactInquiry[]> {
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const inquiries: ContactInquiry[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      inquiries.push({
        id: d.id,
        fullName: data.fullName || data.name || '',
        name: data.fullName || data.name || '',
        phoneNumber: data.phoneNumber || data.phone || '',
        phone: data.phoneNumber || data.phone || '',
        message: data.message || '',
        status: (data.status as InquiryStatus) || 'Pending',
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });

    // Update local cache
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch {}

    return inquiries;
  } catch (err) {
    console.error('Error fetching inquiries from Firestore, falling back to cache:', err);
    return getStoredInquiries();
  }
}

/**
 * Update inquiry status in Firestore (Pending, Confirmed, Completed, Cancelled)
 */
export async function updateInquiryStatusInDb(
  id: string,
  status: InquiryStatus
): Promise<boolean> {
  try {
    const inquiryRef = doc(db, 'inquiries', id);
    await updateDoc(inquiryRef, { status });

    const current = getStoredInquiries();
    const idx = current.findIndex((i) => i.id === id);
    if (idx !== -1) {
      current[idx].status = status;
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(current));
    }
    return true;
  } catch (err) {
    console.error('Error updating inquiry status in Firestore:', err);
    const current = getStoredInquiries();
    const idx = current.findIndex((i) => i.id === id);
    if (idx !== -1) {
      current[idx].status = status;
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(current));
      return true;
    }
    return false;
  }
}

/**
 * Delete inquiry from Firestore and cache
 */
export async function deleteInquiryFromDb(id: string): Promise<boolean> {
  try {
    const inquiryRef = doc(db, 'inquiries', id);
    await deleteDoc(inquiryRef);

    const current = getStoredInquiries();
    const filtered = current.filter((i) => i.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error deleting inquiry from Firestore:', err);
    const current = getStoredInquiries();
    const filtered = current.filter((i) => i.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(filtered));
    return false;
  }
}

export function saveContactInquiry(name: string, phone: string, message: string): ContactInquiry {
  const current = getStoredInquiries();
  const newInquiry: ContactInquiry = {
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: name,
    name,
    phoneNumber: phone,
    phone,
    message,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  const updated = [newInquiry, ...current];
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving inquiry:', err);
  }

  // Also trigger async save to Firestore in background
  saveContactInquiryToDb({ fullName: name, phoneNumber: phone, message }).catch((err) => {
    console.error('Background Firestore sync error:', err);
  });

  return newInquiry;
}
