// Environment Variables
const dotenv = require("dotenv");
require("dotenv").config();

// connecting with express axios and linking the port
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(cors());

// getting the database information from .env
const DB = process.env.DATABASE;

// connecting to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// connections from api
const imagesRouter = require("./api/images");

app.use("/api/images", imagesRouter);
app.use(express.static("./images"));

// read file directory and then add it to the database

const genre = fs.readdirSync("./images");
const name = fs.readdirSync("./images/" + genre[0]);

// fs.readdirSync("./images").forEach((genre) => {
//   fs.readdirSync(`./images/${genre}`).forEach((name) => {
//     const sendImage = new imagesRouter({
//       name: `${name}`,
//       genre: `${genre}`,
//       path: `${genre}/${name}`,
//       type: "png",
//       licence: "Royalty Free",
//     });
//     sendImage
//       .save()
//       .then((doc) => {
//         console.log(doc);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// });

app.get("/api/getAll", async (req, res, next) => {
  try {
    const allImages = await imagesRouter.find(req.body);
    res.json({ allImages: allImages });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/getPath", async (req, res) => {
  try {
    const path = await imagesRouter.distinct("path");
    res.json({ path: path });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while retrieving name." });
  }
});

app.get("/api/getAllFromGenre", async (req, res) => {
  try {
    const ImagesFromGenre = await imagesRouter.find({ genre: /fantasy/ });
    res.json({ imageFromGenre: ImagesFromGenre });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
