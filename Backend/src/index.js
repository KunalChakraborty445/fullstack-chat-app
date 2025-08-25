import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../lib/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from '../routes/auth.route.js'
import messageRoutes from '../routes/message.route.js'
import cors from 'cors';
import { app, server } from '../lib/socket.js'


import path from 'path';

dotenv.config()


app.use(express.json(({ limit: "50mb" })));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../Frontend", "dist", "index.html"));
    })
}
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.resolve(__dirname, "../../Frontend/dist");
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(frontendPath, "index.html"));
    });
}

server.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
