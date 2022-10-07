import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./api/routes/UserRoutes.js";
import myDb from "./api/db/db.js";

dotenv.config();

myDb();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use(UserRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running at http://127.0.0.1:${PORT}`);
});
