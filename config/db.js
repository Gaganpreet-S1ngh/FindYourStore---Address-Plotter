import mongoose from "mongoose";


export async function connectToDb() {
    return await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected to DB!");
    }
    ).catch(err => {
        console.log("Error in database connection!")
    })
};


