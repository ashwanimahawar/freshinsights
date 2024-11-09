import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import passport from "passport";
import path from "path";
import { sessionConfig } from "./config/session";
import bodyParser from "body-parser";
import { corsOptions } from "./config/cors";
import authRouter from "./routes/authRouter";
import dashboardRouter from "./routes/dashboardRouter";
import postRouter from "./routes/postRouter";
import checkAuthRouter from "./routes/checkAuthRouter";
import "./config/passport";
import uploadImageRouter from "./routes/uploadImageRouter";
import commentsRouter from "./routes/commentsRouter";

const app = express();

//dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "../.env") });

//Cors configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//Managing Sessions
app.use(sessionConfig);

//Passport Configuration (This should be just after the session configuration)
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/user", authRouter);
app.use("/user", dashboardRouter);
app.use("/post", postRouter);
app.use("/check-user", checkAuthRouter);
app.use("/image", uploadImageRouter);
app.use("/comment", commentsRouter);

export default app;
