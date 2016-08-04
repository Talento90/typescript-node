import * as Mongoose from "mongoose";
import * as Mockgoose from "mockgoose";
import { IDataConfiguration } from "./configurations";
import { IUser, UserModel } from "./users/user";
import { ITask, TaskModel } from "./tasks/task";

Mongoose.Promise = global.Promise;

export interface IDatabase {
    userModel: Mongoose.Model<IUser>;
    taskModel: Mongoose.Model<ITask>;
}

export function init(config: IDataConfiguration): IDatabase {

    if (config.isMemory) {
        Mockgoose(Mongoose).then(() => {
            Mongoose.connect(config.connectionString, (error) => {
                console.log(error);
            });
        });
    } else {
        Mongoose.connect(config.connectionString);

        let mongoDb = Mongoose.connection;

        mongoDb.on('error', () => {
            console.log(`Unable to connect to database: ${config.connectionString}`);
        });

        mongoDb.once('open', () => {
            console.log(`Connected to database: ${config.connectionString}`);
        });
    };

    return {
        taskModel: TaskModel,
        userModel: UserModel
    };
}