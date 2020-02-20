// const express = require('express');
import express from "express";
import morgan from "morgan";
import helmet from "helmet"; // 보안과 관련된 미들웨어
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter);

app.use('/user', userRouter);

app.use('/video', videoRouter);

export default app;