import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", router);

export default app;
