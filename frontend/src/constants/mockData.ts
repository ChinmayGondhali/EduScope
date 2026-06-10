import { College, User } from "@/types";

export const MOCK_USER: User = {
  id: "u1",
  name: "Aditya Kumar",
  email: "aditya.k@example.com",
  created_at: "2024-05-01T00:00:00.000Z",
};

export const MOCK_COLLEGES: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology (IIT), Bombay",
    description: "IIT Bombay is a leading public technical and research university located in Powai, Mumbai. Established in 1958, it is recognized as an Institute of National Importance.",
    location: "Mumbai, Maharashtra",
    fees: 220000,
    rating: 4.8,
    placement_rate: 98,
    average_package: "22.5 LPA",
    highest_package: "1.6 CPA",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
    created_at: "2024-05-01T00:00:00.000Z",
    courses: [
      { id: "c1", course_name: "Computer Science", duration: "4 Years", fees: 220000 },
      { id: "c2", course_name: "Electrical Engineering", duration: "4 Years", fees: 210000 }
    ],
    reviews: [
      { id: "r1", user_name: "Rahul S.", rating: 5, review_text: "Top-tier education and exposure.", created_at: "2024-05-01" }
    ],
    placement_stats: {
      rate: 98,
      average_package: "22.5 LPA",
      highest_package: "1.6 CPA"
    }
  },
  {
    id: "2",
    name: "Birla Institute of Technology & Science (BITS), Pilani",
    description: "BITS Pilani is a world-renowned private deemed university known for its merit-based admission policy.",
    location: "Pilani, Rajasthan",
    fees: 450000,
    rating: 4.6,
    placement_rate: 95,
    average_package: "18 LPA",
    highest_package: "60 LPA",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop",
    created_at: "2024-05-01T00:00:00.000Z",
    courses: [
      { id: "c3", course_name: "Electronics & Communication", duration: "4 Years", fees: 450000 }
    ],
    placement_stats: {
      rate: 95,
      average_package: "18 LPA",
      highest_package: "60 LPA"
    }
  },
  {
    id: "3",
    name: "National Institute of Design (NID), Ahmedabad",
    description: "NID is the premier design school in India, known for its multidisciplinary approach to design education.",
    location: "Ahmedabad, Gujarat",
    fees: 380000,
    rating: 4.7,
    placement_rate: 92,
    average_package: "12 LPA",
    highest_package: "35 LPA",
    image_url: "https://images.unsplash.com/photo-1523050338692-7b835a07973f?q=80&w=800&auto=format&fit=crop",
    created_at: "2024-05-01T00:00:00.000Z",
    courses: [
      { id: "c4", course_name: "Product Design", duration: "4 Years", fees: 380000 }
    ],
    placement_stats: {
      rate: 92,
      average_package: "12 LPA",
      highest_package: "35 LPA"
    }
  },
  {
    id: "4",
    name: "St. Stephens College",
    description: "One of the oldest and most prestigious liberal arts colleges in India, affiliated with Delhi University.",
    location: "New Delhi, Delhi",
    fees: 120000,
    rating: 4.5,
    placement_rate: 88,
    average_package: "10 LPA",
    highest_package: "25 LPA",
    image_url: "https://images.unsplash.com/photo-1498243639351-a75d7f814507?q=80&w=800&auto=format&fit=crop",
    created_at: "2024-05-01T00:00:00.000Z",
    courses: [
      { id: "c5", course_name: "Economics (Hons)", duration: "3 Years", fees: 120000 }
    ],
    placement_stats: {
      rate: 88,
      average_package: "10 LPA",
      highest_package: "25 LPA"
    }
  },
  {
    id: "5",
    name: "College of Engineering (COEP), Pune",
    description: "COEP is an autonomous engineering institute and one of the oldest in Asia.",
    location: "Pune, Maharashtra",
    fees: 110000,
    rating: 4.4,
    placement_rate: 94,
    average_package: "11 LPA",
    highest_package: "42 LPA",
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=800&auto=format&fit=crop",
    created_at: "2024-05-01T00:00:00.000Z",
    courses: [
      { id: "c6", course_name: "Computer Engineering", duration: "4 Years", fees: 110000 }
    ],
    placement_stats: {
      rate: 94,
      average_package: "11 LPA",
      highest_package: "42 LPA"
    }
  }
];
