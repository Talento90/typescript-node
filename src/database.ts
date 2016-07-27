
import * as Mongoose from "mongoose";
import * as Configs from "./configurations";

Mongoose.Promise = global.Promise;

export function init() {
    const connectionString = Configs.get("database:connectionString");

    Mongoose.connect(connectionString);
    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${connectionString}`);
    });
}