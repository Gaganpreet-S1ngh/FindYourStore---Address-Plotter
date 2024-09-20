import mongoose from "mongoose";
import { geocoder } from "../utils/geocoder.js";

const storeSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, "Please enter a store ID"],
        unique: true,
        trim: true,
        maxlength: [10, "Store ID must be less than 10 characters."]
    },

    address: {
        type: String,
        required: [true, "Please add an address"]
    },

    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'],

        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },

        formattedAddress: String
    }

}, { timestamps: true });



//Geocoding

storeSchema.pre('save', async function (next) {
    const res = await geocoder.geocode(this.address);
    this.location = {
        type: "Point",
        coordinates: [res[0].longitude, res[0].latitude],
        formattedAddress: `${res[0].city} , ${res[0].state} , ${res[0].country}`
    }

    next();
})

export const Stores = mongoose.model("Store", storeSchema);




