export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  benefits: string[];
  deliverables: string[];
  priceFrom: number;
  duration: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  year: number;
  description: string;
  tags: string[];
  image: string;
  rating: number;
  duration: string;
  outcome: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  initials: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

export interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'in-review' | 'approved' | 'completed';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export type RequestStatus = ServiceRequest['status'];
