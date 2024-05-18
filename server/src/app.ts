import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: false
    })
);

// app.use('/', userController);

export default app;