import type { LinkInsertModel, LinkUpdateModel } from "@/db/types";
import { LinkRepository } from "@/repositories/link.repository";
import { type LinkId, type UserId } from "@mylinkspace/shared";
import { ForbiddenError, NotFoundError, ServerError } from "@/utils/errors";

export class LinkService {
  static async createLink(data: LinkInsertModel) {
    // Create link
    const link = await LinkRepository.create(data);
    if (!link) throw new ServerError("Failed to create link");

    return link;
  }

  static async getLinkById(user_id: UserId, link_id: LinkId) {
    // Check if user have this link
    const isUserHaveLink = await this.isUserHaveLink(user_id, link_id);
    if (!isUserHaveLink) throw new ForbiddenError();

    // Get link
    const link = await LinkRepository.getLinkById(link_id);
    if (!link) throw new NotFoundError("Link not found");

    return link;
  }

  static async getLinksByUserId(id: UserId) {
    // Get links
    const links = await LinkRepository.getLinksByUserId(id);
    if (!links) throw new NotFoundError("Links not found");

    return links;
  }

  static async updateLink(
    user_id: UserId,
    link_id: LinkId,
    data: LinkUpdateModel
  ) {
    // Check if user have this link
    const isUserHaveLink = await this.isUserHaveLink(user_id, link_id);
    if (!isUserHaveLink) throw new ForbiddenError();

    // Update link
    const link = await LinkRepository.update(link_id, data);
    if (!link) throw new NotFoundError("Link not found");

    return link;
  }

  static async deleteLink(user_id: UserId, link_id: LinkId) {
    // Check if user have this link
    const isUserHaveLink = await this.isUserHaveLink(user_id, link_id);
    if (!isUserHaveLink) throw new ForbiddenError();

    // Delete link
    const link = await LinkRepository.delete(link_id);
    if (!link) throw new NotFoundError("Link not found");

    return link;
  }

  static async isUserHaveLink(user_id: UserId, link_id: LinkId) {
    // Get link
    const link = await LinkRepository.getLinkById(link_id);

    // Check if user have this link
    return link?.user_id === user_id;
  }
}
