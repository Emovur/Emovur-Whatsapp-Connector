import mongoose from "mongoose";
import { dbUrl } from "../helpers/urlHelper.js";

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(dbUrl(), {
            //            maxConnecting: 5,
            //            maxPoolSize: 500,
            //            wtimeoutMS: 2500,
            //            useNewUrlParser: true
        });
        //console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default dbConnection;