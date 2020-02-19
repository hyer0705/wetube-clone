// const express = require('express');
import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('I\'m out of shape');

const handleProfile = (req, res) => res.send('Welcome my Profile page!');

const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
}

app.use(betweenHome);

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);