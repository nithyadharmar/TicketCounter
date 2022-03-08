import { Server, Socket } from "socket.io"
import { Counter, Token } from "./server/models/token";

const refreshCounter = (socket: Socket | Server) =>
    (counter: Counter) => socket.emit("counter", counter);

const refreshToken = (socket: Socket | Server) =>
    (token: Token) => socket.emit("token", token);

export default (io: Server) => {

    io.on("connection", (socket) => {

        socket.on("counter", (counter: Counter) => {
            refreshCounter(io)(counter);
        });

        socket.on("token", (token: Token) => {
            refreshToken(io)(token);
        });
    });
};