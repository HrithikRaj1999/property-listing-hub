import { RequestHandler } from "express";
import { HTTP_STATUS_CODES, MESSAGES } from "../constants/codes-messages";
import { Listing } from "../models/listingModel";

export const createListing: RequestHandler<
  unknown,
  unknown,
  any,
  unknown
> = async (req, res, next) => {
  try {
    const listing = await Listing.create({ ...req.body });
    return res
      .status(HTTP_STATUS_CODES.OK)
      .send({ success: true, message: MESSAGES.SUCCESS_LISTING, listing });
  } catch (error) {
    next(error);
  }
};
