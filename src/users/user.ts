import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
  name: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
};

export const UserSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
}, {
    timestamps: true
  });

export const UserModel = Mongoose.model<IUser>('User', UserSchema);