import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(
    "mongodb+srv://MERNAUTH:MERNAUTH1122@cluster0.twlrv3h.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("db connectd");
  })
  .catch((err) => {
    console.log("db not connected", err);
  });
