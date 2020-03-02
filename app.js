// const express = require('express');
import express from "express";
import morgan from "morgan";
import helmet from "helmet"; // 보안과 관련된 미들웨어
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(helmet());
app.set("view engine", "pug"); // view engine 을 pug로 바꿈
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;