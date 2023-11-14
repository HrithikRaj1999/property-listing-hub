import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { cookieController } from "../controller/cookie_controller";
import { authRouter } from "../routes/auth_routes";
import { listingRouter } from "../routes/listing_routes";
import { userRouter } from "../routes/user_routes";
import errorHandler from "../util/error";
import { verifyToken } from "../util/verifyUser";
import path from "path";
import helmet from "helmet";

const app = express();
app.use(morgan("dev"));

// Add Helmet middleware for setting security headers
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
  credentials: true,
}));
const __folderName = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use("/api/checkCookie", verifyToken, cookieController);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__folderName, "/client/build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__folderName, "client", "build", "index.html"));
});
app.use(errorHandler);

export default app;
