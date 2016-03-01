import * as Mongoose from 'mongoose'

export interface IEntity extends Mongoose.Document {
    _version: number;
    createdDate: Date;
    updatedAt: Date;
}


export interface ITask extends IEntity {
    name: string;
    description: string;
    completed: boolean;
}