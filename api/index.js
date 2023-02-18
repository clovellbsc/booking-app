import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO);
    console.log("DB connection established");
  } catch (e) {
    console.log(e);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => console.log("Disconnected!"));
mongoose.connection.on("connected", () => console.log("Connected!"));

//middleware
app.use(express.json());

app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(8000, () => {
  connect();
  console.log("listening on port 8000");
});
