import express from "express"
import cookieParser from 'cookie-parser';

import { userController } from './controllers/userController';

export const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/users', userController)