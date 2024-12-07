import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/DB/db.js";
import {router as todoRouter} from "./src/routes/todo.route.js"

//env config
dotenv.config()

//Port
const port = process.env.PORT || 5000;

//App
const app = express();

//Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));
app.use('/api/v1/todo', todoRouter);

//SERVER Listening
connectDB()
.then(() => {
    app.listen(port, () => {
        console.log("server is listening on port: ",port)
    })
}).catch((err) => console.log(err.message))
