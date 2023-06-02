const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const useRoutes = require("./routes/index");

dotenv.config();

const connectMongo = async (app) => {
  const PORT = process.env.PORT | 5000;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb Connected...");
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  } catch (e) {
    console.error("Mongodb connect error - ", err);
  }
}

const setBasicHeaders = (app) => app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
})

const run = async () => {
  const app = express();
  connectMongo(app);
  setBasicHeaders(app);
  app.use(express.json());
  useRoutes(app);
};

run();
