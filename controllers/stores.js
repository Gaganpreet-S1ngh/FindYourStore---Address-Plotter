import { Stores } from "../models/Store.js"


export async function addStore(req, res) {
    try {
        const { storeId, address } = req.body;
        if (!storeId || !address) {
            return res.status(400).send({
                status: "Failed",
                error: "Enter both the fields!"
            })
        }

        const store = await Stores.create({
            storeId,
            address
        })

        console.log(store);

        return res.status(200).send({
            status: "Success",
            store
        })

    } catch (error) {
        res.status(500).json({
            message: "error in adding store.",
            error
        })
        process.exit(1);
    }
}

export async function getAllStores(req, res) {
    try {
        const stores = await Stores.find();

        return res.status(200).json({
            status: "success",
            size: stores.length,
            stores
        })

    } catch (error) {
        res.status(500).json({
            message: "error in getting store.",
            error
        })
        process.exit(1);
    }
}
