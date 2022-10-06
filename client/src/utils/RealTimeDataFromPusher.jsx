import React from "react";
import Pusher from "pusher-js";

const RealTimeDataFromPusher = () => {
  const [pusherUser, setpusherUser] = React.useState([]);

  React.useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("updateUser");
    channel.bind("updated", (data) => {
      setpusherUser(data);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [pusherUser]);

  return pusherUser;
};

export default RealTimeDataFromPusher;
