import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { AdminRecord, AdminRole, AdminStatus } from '../types';

export const PRIMARY_OWNER_EMAIL = 'avantnaitam07@gmail.com';

/**
 * Checks whether an email belongs to an authorized admin and returns their role and status.
 */
export async function checkUserAdminRole(rawEmail: string): Promise<{
  isAuthorized: boolean;
  role: AdminRole | null;
  status: AdminStatus | null;
}> {
  if (!rawEmail) {
    return { isAuthorized: false, role: null, status: null };
  }

  const email = rawEmail.toLowerCase().trim();

  // If primary owner, ensure their record is in Firestore and grant Owner
  if (email === PRIMARY_OWNER_EMAIL) {
    try {
      const ownerRef = doc(db, 'admins', email);
      const snap = await getDoc(ownerRef);
      if (!snap.exists()) {
        await setDoc(ownerRef, {
          email,
          role: 'Owner' as AdminRole,
          status: 'Active' as AdminStatus,
          addedAt: new Date().toISOString(),
          addedBy: 'System Bootstrap',
        });
      }
    } catch (err) {
      console.warn('Could not auto-sync primary owner doc:', err);
    }
    return { isAuthorized: true, role: 'Owner', status: 'Active' };
  }

  try {
    const adminRef = doc(db, 'admins', email);
    const snap = await getDoc(adminRef);

    if (snap.exists()) {
      const data = snap.data() as AdminRecord;
      if (data.status === 'Active') {
        return { isAuthorized: true, role: data.role || 'Business Admin', status: data.status };
      }
      return { isAuthorized: false, role: data.role, status: data.status };
    }
  } catch (err) {
    console.error('Error checking admin role in Firestore:', err);
  }

  return { isAuthorized: false, role: null, status: null };
}

/**
 * Fetches all authorized admins from Firestore. Only callable by Owner.
 */
export async function getAuthorizedAdmins(): Promise<AdminRecord[]> {
  try {
    const adminsCol = collection(db, 'admins');
    const snapshot = await getDocs(adminsCol);
    const list: AdminRecord[] = [];

    snapshot.forEach((d) => {
      list.push(d.data() as AdminRecord);
    });

    // If empty, ensure PRIMARY_OWNER_EMAIL is present
    const hasOwner = list.some((a) => a.email.toLowerCase() === PRIMARY_OWNER_EMAIL);
    if (!hasOwner) {
      const initialOwner: AdminRecord = {
        email: PRIMARY_OWNER_EMAIL,
        role: 'Owner',
        status: 'Active',
        addedAt: new Date().toISOString(),
        addedBy: 'System Bootstrap',
      };
      try {
        await setDoc(doc(db, 'admins', PRIMARY_OWNER_EMAIL), initialOwner);
        list.unshift(initialOwner);
      } catch (err) {
        console.warn('Error creating initial owner doc:', err);
        list.unshift(initialOwner);
      }
    }

    return list.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  } catch (err) {
    console.error('Error fetching authorized admins:', err);
    return [];
  }
}

/**
 * Adds a new admin or updates existing admin authorization. Only Owner can perform this.
 */
export async function addAuthorizedAdmin(
  rawEmail: string,
  role: AdminRole,
  addedBy: string
): Promise<void> {
  const email = rawEmail.toLowerCase().trim();
  const adminRef = doc(db, 'admins', email);

  const newAdmin: AdminRecord = {
    email,
    role,
    status: 'Active',
    addedAt: new Date().toISOString(),
    addedBy,
  };

  await setDoc(adminRef, newAdmin, { merge: true });
}

/**
 * Revokes or restores an admin's access.
 */
export async function updateAdminStatus(rawEmail: string, status: AdminStatus): Promise<void> {
  const email = rawEmail.toLowerCase().trim();
  const adminRef = doc(db, 'admins', email);
  await updateDoc(adminRef, { status });
}

/**
 * Updates an admin's role.
 */
export async function updateAdminRole(rawEmail: string, role: AdminRole): Promise<void> {
  const email = rawEmail.toLowerCase().trim();
  const adminRef = doc(db, 'admins', email);
  await updateDoc(adminRef, { role });
}

/**
 * Completely removes an admin record from Firestore.
 */
export async function removeAuthorizedAdmin(rawEmail: string): Promise<void> {
  const email = rawEmail.toLowerCase().trim();
  const adminRef = doc(db, 'admins', email);
  await deleteDoc(adminRef);
}
