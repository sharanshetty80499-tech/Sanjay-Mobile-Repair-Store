export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'smartphones' | 'accessories';
  subCategory?: string; // Screen guards, charger, back cover, earphone, etc.
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  stock: number;
  specs: string[];
  description: string;
  isPopular?: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'UPI' | 'COD' | 'Card';
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export type RepairStatus = 'booked' | 'assigned' | 'diagnosing' | 'parts_ordered' | 'ready' | 'collected' | 'cancelled';

export interface RepairTimelineLog {
  status: RepairStatus;
  notes: string;
  timestamp: string;
}

export interface RepairBooking {
  id: string; // e.g., SJ-REP-XXXX
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceBrand: string;
  deviceModel: string;
  issueType: 'screen' | 'battery' | 'charging' | 'water_damage' | 'software' | 'other';
  issueDescription: string;
  estimatedCost: number;
  actualCost?: number;
  status: RepairStatus;
  scheduledDate: string;
  scheduledSlot: string; // e.g., "10:00 AM - 12:00 PM"
  timeline: RepairTimelineLog[];
  notes?: string;
  trackingToken?: string;
  aiDiagnosis?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId?: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  deviceWorkedOn?: string;
  isVerifiedPurchase?: boolean;
  replyFromOwner?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId?: string;
  bookingId?: string;
  userId: string;
  amount: number;
  method: 'UPI' | 'COD' | 'Card';
  transactionRef?: string; // UPI transaction ID
  status: 'pending' | 'success' | 'failed';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'booking' | 'order' | 'general';
  targetId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
