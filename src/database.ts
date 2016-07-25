
import * as Mongoose from "mongoose";
Mongoose.Promise = global.Promise;

export function init(connectionString: string) {

    Mongoose.connect(connectionString);
    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${connectionString}`);
    });
}