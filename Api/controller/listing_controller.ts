import { RequestHandler } from "express";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGE, MESSAGES } from "../constants/codes-messages";
import { Listing } from "../models/listingModel";
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
  offer?: boolean;
  furnished?: boolean;
  parkingQuery?: boolean;
  type?: string;
  searchTerm?: string;
  sort?: string;
  order?: string;
}

export const getListings: RequestHandler<unknown, unknown, unknown, QueryParams> = async (
  req,
  res,
  next
) => {
  try {
    const { query } = req;
    const limit = parseInt(query.limit) || 6;
    const startIndex = parseInt(query.startIndex) || 0;
    const offerQuery = query.offer || { $in: [false, true] };
    const furnishedQuery = query.furnished || { $in: [false, true] };
    const parkingQuery = query.parkingQuery || { $in: [false, true] };
    const typeQuery = !query.type || query.type === "all" ? { $in: ["sale", "rent"] } : query.type;
    const searchTerm = query.searchTerm || "";

    //By using the Record utility type, we are explicitly telling TypeScript that
    //sortObject is an object with string keys and values of type 'asc' | 'desc'.
    const sortField = query.sort || "createdAt";
    const sortOrder = query.order || "desc";
    const sortObject: Record<string, "asc" | "desc"> = {};
    sortObject[sortField] = sortOrder as "asc" | "desc";

    const filteredListing = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offerQuery,
      furnishedQuery,
      parkingQuery,
      typeQuery,
    })
      .sort(sortObject)
      .limit(limit)
      .skip(startIndex);
    return res.status(HTTP_STATUS_CODES.CREATED).send({
      success: true,
      message: "searched successfully",
      Listing: { ...filteredListing },
    });
  } catch (error) {
    next(error);
  }
};
