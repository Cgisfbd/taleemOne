export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}
