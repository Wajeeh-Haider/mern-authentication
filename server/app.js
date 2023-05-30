import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./api/routes/UserRoutes.js";
import studentRoutes from "./api/routes/StudentR.js";
import myDb from "./api/db/db.js";
import morgan from "morgan";

dotenv.config();

myDb();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(UserRoute);
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
