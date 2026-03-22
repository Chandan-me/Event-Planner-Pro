import weddingImg from "@/assets/event-wedding.jpg";
import corporateImg from "@/assets/event-corporate.jpg";
import birthdayImg from "@/assets/event-birthday.jpg";
import partyImg from "@/assets/event-party.jpg";

export interface EventItem {
  id: string;
  title: string;
  category: "wedding" | "birthday" | "corporate" | "party";
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  isFavorite?: boolean;
}

export interface Booking {
  id: string;
  eventTitle: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
  amount: number;
  category: string;
}

export const events: EventItem[] = [
  { id: "1", title: "Royal Garden Wedding", category: "wedding", image: weddingImg, price: 399999, originalPrice: 579999, rating: 4.9, reviews: 234, description: "An enchanting garden wedding experience with premium florals and gourmet catering." },
  { id: "2", title: "Tech Summit 2025", category: "corporate", image: corporateImg, price: 249999, rating: 4.7, reviews: 189, description: "State-of-the-art corporate event with world-class AV setup and networking." },
  { id: "3", title: "Neon Dreams Birthday", category: "birthday", image: birthdayImg, price: 124999, originalPrice: 164999, rating: 4.8, reviews: 312, description: "A vibrant, neon-themed birthday celebration with DJ and custom decorations." },
  { id: "4", title: "Skyline Rooftop Soirée", category: "party", image: partyImg, price: 289999, rating: 4.6, reviews: 156, description: "Exclusive rooftop party with panoramic city views and premium cocktails." },
  { id: "5", title: "Vintage Chapel Wedding", category: "wedding", image: weddingImg, price: 499999, rating: 5.0, reviews: 98, description: "A classic vintage wedding in a historic chapel surrounded by vineyards." },
  { id: "6", title: "Annual Gala Dinner", category: "corporate", image: corporateImg, price: 659999, originalPrice: 829999, rating: 4.9, reviews: 67, description: "Black-tie gala dinner with live orchestra and five-course meal." },
  { id: "7", title: "Kids Adventure Party", category: "birthday", image: birthdayImg, price: 64999, rating: 4.5, reviews: 445, description: "Fun-filled adventure party with games, magic shows, and themed decorations." },
  { id: "8", title: "Masquerade Ball", category: "party", image: partyImg, price: 199999, originalPrice: 274999, rating: 4.8, reviews: 201, description: "An elegant masquerade ball with live entertainment and costume contests." },
];

export const bookings: Booking[] = [
  { id: "B001", eventTitle: "Royal Garden Wedding", date: "2025-04-15", status: "confirmed", amount: 399999, category: "Wedding" },
  { id: "B002", eventTitle: "Neon Dreams Birthday", date: "2025-05-20", status: "pending", amount: 124999, category: "Birthday" },
  { id: "B003", eventTitle: "Tech Summit 2025", date: "2025-03-10", status: "cancelled", amount: 249999, category: "Corporate" },
  { id: "B004", eventTitle: "Skyline Rooftop Soirée", date: "2025-06-01", status: "confirmed", amount: 289999, category: "Party" },
  { id: "B005", eventTitle: "Masquerade Ball", date: "2025-07-14", status: "pending", amount: 199999, category: "Party" },
];

export const testimonials = [
  { name: "Sarah Mitchell", role: "Bride", avatar: "SM", content: "Event-Planner-Pro made our dream wedding a reality. Every detail was perfect!", rating: 5 },
  { name: "James Rodriguez", role: "CEO, TechCorp", avatar: "JR", content: "The corporate event management was seamless. Our annual summit was the best yet.", rating: 5 },
  { name: "Emily Chen", role: "Party Host", avatar: "EC", content: "The birthday party exceeded all expectations. My daughter was thrilled!", rating: 5 },
  { name: "Michael Park", role: "Event Organizer", avatar: "MP", content: "Professional, reliable, and creative. Highly recommend for any event.", rating: 5 },
];

export const pricingPlans = [
  { name: "Basic", price: 2499, period: "/month", features: ["Up to 3 events/month", "Basic templates", "Email support", "Standard analytics"], popular: false },
  { name: "Premium", price: 6499, period: "/month", features: ["Unlimited events", "Premium templates", "Priority support", "Advanced analytics", "Custom branding", "Team collaboration"], popular: true },
  { name: "Pro", price: 12499, period: "/month", features: ["Everything in Premium", "Dedicated manager", "API access", "White-label solution", "24/7 phone support", "Custom integrations"], popular: false },
];

export const faqItems = [
  { question: "How do I book an event?", answer: "Simply browse our event categories, select the event you want, choose your date and preferences, and proceed to checkout. Our team will confirm your booking within 24 hours." },
  { question: "What is the cancellation policy?", answer: "You can cancel up to 7 days before the event for a full refund. Cancellations within 7 days may incur a 20% fee. No-shows are non-refundable." },
  { question: "Can I customize my event package?", answer: "Absolutely! All our packages are fully customizable. Contact our event planners to discuss your specific needs and preferences." },
  { question: "Do you offer payment plans?", answer: "Yes, we offer flexible payment plans for events over ₹1,50,000. You can split your payment into 2-4 installments with no additional fees." },
  { question: "What areas do you serve?", answer: "We currently serve all major cities across India and internationally. Contact us to check availability in your area." },
];

export const notifications = [
  { id: "1", title: "Booking Confirmed", message: "Your Royal Garden Wedding booking has been confirmed.", time: "2 min ago", type: "success" as const },
  { id: "2", title: "Payment Received", message: "Payment of ₹3,99,999 has been successfully processed.", time: "1 hour ago", type: "info" as const },
  { id: "3", title: "Special Offer!", message: "Get 20% off on corporate events this month.", time: "3 hours ago", type: "warning" as const },
  { id: "4", title: "New Event Added", message: "Check out our new Masquerade Ball package.", time: "1 day ago", type: "info" as const },
];

export const formatINR = (amount: number) => {
  return "₹" + amount.toLocaleString("en-IN");
};
