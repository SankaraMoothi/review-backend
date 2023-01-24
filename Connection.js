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
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
