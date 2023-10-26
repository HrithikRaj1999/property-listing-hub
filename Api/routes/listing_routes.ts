import express from "express";
import { createListing, deleteListing } from "../controller/listing_controller";
import { verifyToken } from "../util/verifyUser";

export const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete-listing/:userId/:listId", verifyToken, deleteListing);
