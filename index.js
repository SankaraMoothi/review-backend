import express from "express";
import { connect } from "./Connection.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/review.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/review", reviewRoute);

app.listen(PORT, () => {
  connect();
  console.log(`The server started in: ${PORT} ✨✨`);
});
