import mongoose from "mongoose";
import dotenv from "dotenv";
import Pusher from "pusher";

dotenv.config();

const myDb = () => {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  });

  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  );

  const db = mongoose.connection;
  db.once("open", () => {
    console.log("DB connected");
    const msgCollection = db.collection("users");
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change) => {
      try {
        if (change.operationType === "update") {
          const { updatedFields } = change.updateDescription;
          pusher.trigger("updateUser", "updated", {
            fullName: updatedFields.fullName,
            address: updatedFields.address,
          });
        } else {
          console.log("Error triggering Pusher");
        }
      } catch (error) {
        console.log("Error triggering Pusher", error);
      }
    });
  });
};

export default myDb;
