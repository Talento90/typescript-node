import * as Mongoose from "mongoose";

export interface ITask extends Mongoose.Document {
  name: string;
  description: string;
  completed: boolean;
};

export const TaskSchema = new Mongoose.Schema({
  name: { type:String, required: true },
  description: String,
  completed: Boolean
});

export const TaskModel = Mongoose.model<ITask>('Task', TaskSchema);