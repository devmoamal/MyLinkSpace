const API_BASE_URL = "http://192.168.100.254:3000/api/v1";

/**
 * Base API client with common fetch configuration.
 */
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make a fetch request with JSON handling.
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An error occurred",
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}

export const apiClient = new ApiClient();
