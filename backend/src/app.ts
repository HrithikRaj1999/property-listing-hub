import express from "express";
import { MESSAGES } from "../constants/message";
const app = express();

app.get("/", (req, res) => {
  res.send(MESSAGES.SERVER_RES);
});
export default app;
