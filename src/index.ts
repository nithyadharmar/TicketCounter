import express from "express";
import http from "http";
import cors from "cors";
import SocketIOServer from "socket.io";
import initializeSocketIO from "./socket";
import { tokensRouter } from "./server/routes/tokenRoute";
import path from "path";
import Bundler from "parcel-bundler";

const app = express();
const server = new http.Server(app);
const io = SocketIOServer(server);
const port = process.env.PORT || 9900;

 app.use(cors());
// ** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

app.use("/api/tokens", tokensRouter);

const bundler = new Bundler(path.join(__dirname, "../src/client/index.html"));

initializeSocketIO(io);
app.use(bundler.middleware());

server.listen(port, () => {
    console.log(`server started at https://nithya-ticket-counter.herokuapp.com:${port}`);
});
