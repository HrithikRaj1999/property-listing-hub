import { RequestHandler } from "express";
import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGE,
  MESSAGES,
} from "../constants/codes-messages";
import { Listing } from "../models/listingModel";
import { logger } from "../logger/logger";
import createHttpError from "http-errors";
import { itemType } from "../../client/src/hooks/useShowListing";
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
export interface ListingDataType {
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
  ListingDataType,
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

export const deleteListing: RequestHandler<
  { userId: string; listId: string },
  unknown,
  { tokenUserId: string },
  unknown
> = async (req, res, next) => {
  const { tokenUserId } = req.body;
  const { userId, listId } = req.params;
  try {
    if (tokenUserId !== userId) {
      return next(
        createHttpError(
          HTTP_STATUS_CODES.UNAUTHORIZED,
          HTTP_STATUS_MESSAGE.UNAUTHORIZED
        )
      );
    }
    await Listing.findByIdAndDelete(listId);
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "Listing Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateListProperty: RequestHandler<
  { userId: string; listId: string },
  unknown,
  { tokenUserId: string; values: itemType; imageUrls: string },
  unknown
> = async (req, res, next) => {
  const { tokenUserId, values, imageUrls } = req.body;
  const { userId, listId } = req.params;
  try {
    if (tokenUserId !== userId) {
      return next(
        createHttpError(
          HTTP_STATUS_CODES.UNAUTHORIZED,
          HTTP_STATUS_MESSAGE.UNAUTHORIZED
        )
      );
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      listId,
      { ...values, imageUrls },
      { new: true }
    );
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "Listing Updated Successfully",
      updatedListing,
    });
  } catch (error) {
    next(error);
  }
};
