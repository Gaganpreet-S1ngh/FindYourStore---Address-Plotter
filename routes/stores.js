import express from "express";
import { addStore, getAllStores } from "../controllers/stores.js";

const router = express.Router();


//find all stores

router.get("/getStores", getAllStores);

//add a store

router.post("/addStore", addStore);

export default router;  