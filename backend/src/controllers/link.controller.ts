import { LinkService } from "@/services/link.service";
import { UserService } from "@/services/user.service";
import type { JwtPayload } from "@/types";
import { ForbiddenError, NotFoundError } from "@/utils/errors";
import { Response } from "@/utils/response";
import type {
  CreateLinkDTO,
  UpdateLinkDTO,
  LinkIdDTO,
} from "@mylinkspace/shared";
import type { Context } from "hono";

export class LinkController {
  static async createLink(c: Context) {
    // Get auth user id
    const { id: auth_user_id } = c.get("user") as JwtPayload;
    // Get link data
    const { ...link } = c.get("body") as CreateLinkDTO;

    const newLink = await LinkService.createLink({
      user_id: auth_user_id,
      ...link,
    });

    return Response.success(c, { data: { link: newLink } });
  }

  static async getLinkById(c: Context) {
    // Get auth user id
    const { id: auth_user_id } = c.get("user") as JwtPayload;
    // Get link id
    const { id: link_id } = c.get("params") as LinkIdDTO;

    const link = await LinkService.getLinkById(auth_user_id, link_id);
    return Response.success(c, { data: { link } });
  }

  static async getLinksByUserId(c: Context) {
    // Get auth user id
    const { id: auth_user_id } = c.get("user") as JwtPayload;

    const links = await LinkService.getLinksByUserId(auth_user_id);
    return Response.success(c, { data: { links } });
  }

  static async updateLink(c: Context) {
    // Get auth user id
    const { id: auth_user_id } = c.get("user") as JwtPayload;
    // Get link id
    const { id: link_id } = c.get("params") as LinkIdDTO;
    // Get link data
    const { ...link } = c.get("body") as UpdateLinkDTO;

    const updatedLink = await LinkService.updateLink(
      auth_user_id,
      link_id,
      link
    );
    return Response.success(c, { data: { link: updatedLink } });
  }

  static async deleteLink(c: Context) {
    // Get auth user id
    const { id: auth_user_id } = c.get("user") as JwtPayload;
    // Get link id
    const { id: link_id } = c.get("params") as LinkIdDTO;

    const deletedLink = await LinkService.deleteLink(auth_user_id, link_id);
    return Response.success(c, { data: { link: deletedLink } });
  }
}
