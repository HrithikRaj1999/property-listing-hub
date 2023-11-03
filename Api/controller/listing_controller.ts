import { RequestHandler } from "express";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGE, MESSAGES } from "../constants/codes-messages";
import { Listing } from "../models/listingModel";
import createHttpError from "http-errors";
import { itemType } from "../../client/src/hooks/useShowListing";
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
export interface ListingDataType {
  name?: string;
  description?: string;
  address?: string;
  type?: string;
  specifications?: SpecificationsType;
  facilities?: FacilitiesType;
  imageUrls?: string[];
}

export const createListing: RequestHandler<unknown, unknown, ListingDataType, unknown> = async (
  req,
  res,
  next
) => {
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
        createHttpError(HTTP_STATUS_CODES.UNAUTHORIZED, HTTP_STATUS_MESSAGE.UNAUTHORIZED)
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
        createHttpError(HTTP_STATUS_CODES.UNAUTHORIZED, HTTP_STATUS_MESSAGE.UNAUTHORIZED)
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
      listing: updatedListing,
    });
  } catch (error) {
    next(error);
  }
};

export const getListingById: RequestHandler<
  { listingId: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId);
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "Listing Retrieved Successfully",
      listing: listing,
    });
  } catch (error) {
    next(error);
  }
};

interface QueryParams {
  limit: string;
  startIndex: string;
  amenities?: string;
  type?: string;
  searchText?: string;
  sortBy?: string;
  roomType?: string;
}

interface searchQueryType {
  name?: { $regex: string; $options: string };
  roomType?: { $regex: string; $options: string };
  type?: { $in: string[] };
  facilities?: { $in: string[] };
}
export const getListings: RequestHandler<unknown, unknown, unknown, QueryParams> = async (
  req,
  res,
  next
) => {
  try {
    const { query } = req;
    const { searchText, limit, startIndex, sortBy, type, amenities, roomType } = query;
    const [sortField, sortOrder] = sortBy ? sortBy.split("_") : ["createdAt", "asc"];
    const intLimit = parseInt(limit, 10) || 6;
    const intStartIndex = parseInt(startIndex, 10) || 0;
    const searchQuery: Partial<searchQueryType> = {};
    if (searchText) {
      searchQuery.name = { $regex: searchText, $options: "i" };
    }
    if (roomType) {
      searchQuery.roomType = { $regex: roomType, $options: "i" };
    }
    if (type && type.length > 0) {
      searchQuery.type = { $in: type.split(",").filter((type) => type) };
    }
    if (amenities && amenities.length > 0) {
      searchQuery.facilities = { $in: amenities.split(",").filter((amenities) => amenities) };
    }

    const filteredListing = await Listing.find(searchQuery)
      .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
      .limit(intLimit)
      .skip(intStartIndex);
   

    return res.status(HTTP_STATUS_CODES.CREATED).send({
      success: true,
      message: "searched successfully",
      listings: [...filteredListing],
    });
  } catch (error) {
    next(error);
  }
};

export const getAllListings: RequestHandler<unknown, unknown, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const listings = await Listing.find({});
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "All Listings Retrieved Successfully",
      listings,
    });
  } catch (error) {
    next(error);
  }
};
export const getSearchedListings: RequestHandler<unknown, unknown, unknown, QueryParams> = async (
  req,
  res,
  next
) => {
  try {
    const { query } = req;
    const { searchText, limit, startIndex } = query;
    const intLimit = parseInt(limit, 10) || 6;
    const intStartIndex = parseInt(startIndex, 10) || 0;
    const searchedItem = await Listing.find({ $text: { $search: searchText || "" } })
      .limit(intLimit)
      .skip(intStartIndex);
    console.log(searchText, searchedItem);
    return res.status(HTTP_STATUS_CODES.CREATED).send({
      success: true,
      message: "searched successfully",
      listings: [...searchedItem],
    });
  } catch (error) {
    next(error);
  }
};
