import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoute.js";
import propertyRoute from "./routes/propertyRoute.js";
import fs from 'fs';
import path from 'path';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production'
}));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/property", propertyRoute);
app.use('/uploads', express.static('uploads'));

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get("/", () => {
  console.log("hello");
});

app
  .listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
