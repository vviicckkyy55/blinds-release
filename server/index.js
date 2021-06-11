
import express from "express";
import Mongoose from "mongoose";

import dotenv from 'dotenv';
import path from 'path';
import userRouter from "./routers/userRouter.js";

import cors from 'cors';
import bodyParser from "body-parser";
import screenRouter from "./routers/screenRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import videoListRouter from "./routers/videoListRouter.js";

import pleaRouter from "./routers/pleaRouter.js";
import imageRouter from "./routers/imageRouter.js";
import uploadFileRouter from "./routers/uploadFileRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://dbuser:dbuser1@cluster0.uyxwf.mongodb.net/Edureka?retryWrites=true&w=majority', {
Mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/blinds-release', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}
);

app.use(express.static('public'));
app.use('/api/videos', express.static('media/uploads'));

// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.html')));

app.use('/api/users', userRouter);
app.use('/api/screens', screenRouter);
app.use('/api/pleas', pleaRouter);
app.use('/api/uploads', imageRouter);

app.use('/api/uploadFile', cors(), uploadFileRouter);

app.use('/api/upload', cors(), uploadRouter);
app.use('/api/videoList', videoListRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    res.send('Server is ready')
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});