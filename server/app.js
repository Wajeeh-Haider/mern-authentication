import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./api/routes/UserRoutes.js";
import mydb from "./api/db/db.js";
dotenv.config();
mydb();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(...corsOptions));

app.use(UserRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running at http://127.0.0.1:${PORT}`);
});
