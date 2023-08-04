/** @format */

import { io } from "socket.io-client";
import { developmentAddress, producionAddress } from "../config/Config";

const userID = localStorage.getItem("userID");

let socket: any = null;

if (userID) {
  socket = io(producionAddress, {
    query: {
      userID: userID,
    },
  });

  socket.on("connect", () => {
    const socketID = socket.id;
    socket.io.opts.query = {
      userID: userID,
      socketID: socketID,
    };
  });
}

export default socket;
