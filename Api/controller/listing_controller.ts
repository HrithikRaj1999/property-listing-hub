import { RequestHandler } from "express";
import { HTTP_STATUS_CODES, MESSAGES } from "../constants/codes-messages";
import { Listing } from "../models/listingModel";
import { logger } from "../logger/logger";
interface FacilitiesType {
  parkingSpot: boolean;
  furnished: boolean;
  semiFurnished: boolean;
  unfurnished: boolean;
  swimmingPool: boolean;
}
interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
export interface ListingFormDataType {
  name?: string;
  description?: string;
  address?: string;
  type?: string;
  specifications?: SpecificationsType;
  facilities?: FacilitiesType;
  imageUrls?: string[];
}

export const createListing: RequestHandler<
  unknown,
  unknown,
  ListingFormDataType,
  unknown
> = async (req, res, next) => {
  try {
    const listing = await Listing.create({ ...req.body });
    console.log(listing);
    return res
      .status(HTTP_STATUS_CODES.OK)
      .send({ success: true, message: MESSAGES.SUCCESS_LISTING, listing });
  } catch (error) {
    next(error);
  }
};
