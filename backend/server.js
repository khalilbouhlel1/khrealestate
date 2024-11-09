import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser"
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
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
