import express from "express";
import {
  UpdateListProperty,
  createListing,
  deleteListing,
  getAllListings,
  getListingById,
  getListings,
  getSearchedListings,
} from "../controller/listing_controller";
import { verifyToken } from "../util/verifyUser";

export const listingRouter = express.Router();
listingRouter.post("/create", verifyToken, createListing);
listingRouter.put("/update-listing/:userId/:listId", verifyToken, UpdateListProperty);
listingRouter.delete("/delete-listing/:userId/:listId", verifyToken, deleteListing);
listingRouter.get("/show-listing/:listingId", getListingById);
listingRouter.get("/get-filtered-listings", getListings);
listingRouter.get("/get-searched-item", getSearchedListings);
listingRouter.get("/get-all-listings", getAllListings);
