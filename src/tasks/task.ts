import * as Mongoose from "mongoose";

export interface ITask extends Mongoose.Document {
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updateAt: Date;
};

export const TaskSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  completed: Boolean
}, {
    timestamps: true
  });

export const TaskModel = Mongoose.model<ITask>('Task', TaskSchema);