import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userController from './controller/user.controller';

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: true
    })
);

app.use(userController);

export default app;