import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { mongodb } from "./services/mongoose";
import Logger from "./services/logger";

import api from "./api/index";
import auth from "./auth/index";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;
const logger = new Logger();

app.use(logger.apiLogs);

app.use(bodyParser.json());

app.use("/", auth);
app.use(api);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.errorLogs(err, req, res, next);
});

mongodb.connect().then(() => {
    // console.log('MongoDB connected!');
}).catch((error) => {
    // console.error('Failed to connect to MongoDB', error);
});

app.listen(PORT, () => {
    console.log(`Express backend server started at port:${PORT}`);
});
