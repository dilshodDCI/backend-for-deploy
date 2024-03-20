import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import user from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/user", user);

app.get("/", (req, res) => {
  res.json({ msg: "Hello World! I am online" });
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database connected and server running on port: `, PORT),
    ),
  )
  .catch((error) => console.log(error));
