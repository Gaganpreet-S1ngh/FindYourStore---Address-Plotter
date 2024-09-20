import express, { application } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

//imports
import { connectToDb } from "./config/db.js";
import storeRouter from "./routes/stores.js"
import { fileURLToPath } from "url";


//dot env config

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5001




//Database Connections
connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port : ${PORT}`);
    })
});

//body parsers

app.use(express.json());

//cors
app.use(cors());

//setting static folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));



//requests

app.use("/stores", storeRouter);







