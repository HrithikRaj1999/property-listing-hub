import mongoose, { Schema } from "mongoose";

/// Client Side types

interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
interface ListingFormDataType {
  imageUrls: string[];
  name: string;
  description: string;
  address: string;
  type: string;
  specifications: SpecificationsType;
  facilities: FacilitiesType;
  userRef: string;
}
interface FacilitiesType {
  parkingSpot: boolean;
  furnished: boolean;
  semiFurnished: boolean;
  unfurnished: boolean;
  swimmingPool: boolean;
}

const listingSchema = new Schema<ListingFormDataType>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    facilities: {
      type: Object,
      required: true,
    },
    specifications: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Listing = mongoose.model<ListingFormDataType>(
  "Listing",
  listingSchema
); //Listing must Me L capital and singular so collection will be named automatically (l)isting(s))
