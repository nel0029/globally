import { io } from "socket.io-client";
import dotenv from "dotenv"



const userID = localStorage.getItem("userID");

let socket: any = null;

if (userID) {
    socket = io("http://127.0.0.1:5000", {
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
