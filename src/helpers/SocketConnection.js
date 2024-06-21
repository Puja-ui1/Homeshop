import io from "socket.io-client";
import config from "./config";


console.log("Inisde socket")

export const socket = io.connect(config.socketUrl, {
  transports: ["websocket","polling"],
 });




// You can also listen for the 'connect' event to be sure when the socket is connected
socket.on('connect', () => {
  console.log("Socket is connected");
});

socket.on('disconnect', () => {
  console.log("Socket is disconnected");
});