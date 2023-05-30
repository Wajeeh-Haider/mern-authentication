// import React from "react";
// import Pusher from "pusher-js";

// const RealTimeDataFromPusher = () => {
//   const [pusherUser, setpusherUser] = React.useState([]);

//   React.useEffect(() => {
//     const pusher = new Pusher("95e4321e5e19afc747e0", {
//       cluster: "mt1",
//     });
//     const channel = pusher.subscribe("updateUser");
//     channel.bind("updated", (data) => {
//       setpusherUser(data);
//     });
//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   }, [pusherUser]);

//   return pusherUser;
// };

// export default RealTimeDataFromPusher;
