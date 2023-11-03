import mongoose, { Schema } from "mongoose";

/// Client Side types just for refernce
interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
export interface ListingDataType {
  name: string;
  description: string;
  address: string;
  phone: string;
  type: string;
  specifications: SpecificationsType;
  roomType: string;
  facilities: string[];
  imageUrls: File[];
  userRef: string;
}
const listingSchema = new Schema<ListingDataType>(
  {
    name: {
      type: String,
      text: true,
      required: true,
    },
    description: {
      type: String,
      text: true,
      required: true,
    },
    address: {
      type: String,
      text: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    facilities: {
      type: [{ type: String, text: true }],
      required: true,
    },
    specifications: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      text: true,
      required: true,
    },
    roomType: {
      type: String,
      text: true,
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


export const Listing = mongoose.model<ListingDataType>("Listing", listingSchema); //Listing must Me L capital and singular so collection will be named automatically (l)isting(s))
