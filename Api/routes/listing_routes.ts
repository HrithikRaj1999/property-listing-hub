import express from "express";
import {
  UpdateListProperty,
  createListing,
  deleteListing,
  getListingById,
  getListings,
} from "../controller/listing_controller";
import { verifyToken } from "../util/verifyUser";

export const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.put("/update-listing/:userId/:listId", verifyToken, UpdateListProperty);
listingRouter.delete("/delete-listing/:userId/:listId", verifyToken, deleteListing);

listingRouter.get("/show-listing/:listingId", getListingById);

listingRouter.get("/get", getListings);
