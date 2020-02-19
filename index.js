// const express = require('express');
import express from "express";
import morgan from "morgan";
import helmet from "helmet"; // 보안과 관련된 미들웨어
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('I\'m out of shape');

const handleProfile = (req, res) => res.send('Welcome my Profile page!');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);