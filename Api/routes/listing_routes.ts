import express from "express";
import { createListing } from "../controller/listing_controller";
import { verifyToken } from "../util/verifyUser";

export const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
