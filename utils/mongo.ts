import mongoose from "mongoose";
import config from "config"

export async function connectToMongo(){
    try {
        await mongoose.connect(config.get('dbUri'))
        console.log("Connected to Database")
    }

    catch(err) {
        console.log(err)
        process.exit(1)
    }
}