export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type InquiryStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export type AdminRole = 'Owner' | 'Business Admin';
export type AdminStatus = 'Active' | 'Revoked';

export interface AdminRecord {
  email: string;
  role: AdminRole;
  status: AdminStatus;
  addedAt: string;
  addedBy?: string;
}

export type ServiceType = 
  | 'Bridal Mehndi'
  | 'Wedding Mehndi'
  | 'Engagement Mehndi'
  | 'Baby Shower Mehndi'
  | 'Special Occasion Mehndi';

export interface BookingRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  serviceType: ServiceType | string;
  eventType: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  name?: string;
  phoneNumber: string;
  phone?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: ServiceType;
  description: string;
  image: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Traditional' | 'Arabic' | 'Special Occasions' | 'Training & Practice';
  image: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  highlight?: string;
  verified?: boolean;
}

export type FAQCategory = 'All' | 'Courses' | 'Bridal Packages' | 'Booking Policies' | 'Stain & Care';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Courses' | 'Bridal Packages' | 'Booking Policies' | 'Stain & Care';
  highlights?: string[];
}
