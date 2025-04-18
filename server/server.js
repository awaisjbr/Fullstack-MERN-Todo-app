import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import {router as todoRouter} from "./src/routes/todo.route.js";

//env config
dotenv.config()

//Port config
const port = process.env.PORT || 5000;

//App config
const app = express();

//Middleware
app.use(express.json());
app.use(cors({origin: `http://localhost:5173`}));
app.use('/api', todoRouter);


app.listen(port, () => {
    console.log("server is listening on port: ",port)
    connectDB();
})





