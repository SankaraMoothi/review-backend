import express from "express";

import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/review.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
//Connection:mongodb
export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to Backend Data Base");
  } catch (error) {
    throw error;
  }
};
connect();
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/auth", authRoute);
app.use("/review", reviewRoute);

app.listen(PORT, () => {
  console.log(`The server started in: ${PORT} ✨✨`);
});
