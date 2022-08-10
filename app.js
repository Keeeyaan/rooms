import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import cookieJwtAuth from "./middleware/cookieJwtAuth.js";
const app = express();

//import all routes here
import UserRoutes from "./routes/UserRoutes.js";
import RoomRoutes from "./routes/RoomRoutes.js";

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies middleware
app.use(cookieParser());

//morgan middleware
app.use(morgan("tiny"));

//cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//router middleware
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/room", cookieJwtAuth, RoomRoutes);

export default app;
