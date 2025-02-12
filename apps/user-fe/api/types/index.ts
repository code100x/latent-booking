// Common types for API requests and responses
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
}

export interface UserValidationResponse {
  status: number;
  message: string;
  data: {
    userid: string;
    email: string;
    phone: string;
    info_1: string;
    name: string;
    username: string;
    is_blank: boolean;
    state: string;
    app_category: string;
    report_url: string;
    cd: string;
    is_tester: boolean;
  };
}
