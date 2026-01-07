import { apiClient } from "@/lib/api";
import type { Link } from "@mylinkspace/shared";

type LinkResponse = {
  success: boolean;
  data: {
    link: Link;
  };
};

type LinksResponse = {
  success: boolean;
  data: {
    links: Link[];
  };
};

type CreateLinkData = {
  title: string;
  url: string;
  type: string;
  icon: string;
};

type UpdateLinkData = Partial<CreateLinkData> & {
  position?: number;
  is_active?: boolean;
};

/**
 * Link API service.
 * Handles CRUD operations for links.
 */
export const linkApi = {
  /**
   * Get all links for current user
   */
  async getMyLinks(token: string): Promise<LinksResponse> {
    return apiClient.get<LinksResponse>("/links", token);
  },

  /**
   * Create a new link
   */
  async createLink(data: CreateLinkData, token: string): Promise<LinkResponse> {
    return apiClient.post<LinkResponse>("/links", data, token);
  },

  /**
   * Update a link
   */
  async updateLink(
    id: number,
    data: UpdateLinkData,
    token: string
  ): Promise<LinkResponse> {
    return apiClient.put<LinkResponse>(`/links/${id}`, data, token);
  },

  /**
   * Delete a link
   */
  async deleteLink(id: number, token: string): Promise<LinkResponse> {
    return apiClient.delete<LinkResponse>(`/links/${id}`, token);
  },
};
