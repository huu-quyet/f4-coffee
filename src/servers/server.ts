import express from "express";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));



export const handler = app;
