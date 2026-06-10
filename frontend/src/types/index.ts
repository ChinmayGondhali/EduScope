export interface Course {
  id: string;
  course_name: string;
  duration: string;
  fees: number;
}

export interface PlacementInfo {
  rate: number;
  average_package: string;
  highest_package: string;
}

export interface Review {
  id: string;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export interface College {
  id: string;
  name: string;
  description?: string;
  location: string;
  fees: number;
  rating: number;
  placement_rate: number;
  average_package: string;
  highest_package: string;
  image_url: string;
  created_at: string;
  // Relational data (from detail API)
  courses?: Course[];
  reviews?: Review[];
  total_reviews?: number;
  placement_stats?: PlacementInfo;
}

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface DashboardData {
  user: User;
  saved_colleges: College[];
  statistics: {
    saved_count: number;
    reviews_count: number;
    applications_count: number;
  };
}

export type SortOption = "rating" | "fees" | "placement_rate" | "name" | "created_at";

export interface PaginationData {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationData;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
