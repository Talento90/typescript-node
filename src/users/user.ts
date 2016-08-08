import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";

export interface IUser extends Mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
  validatePassword(requestPassword): boolean;
};


export const UserSchema = new Mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  });

function hashPassword(password: string): string {
  if (!password) {
    return null;
  }

  return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}

UserSchema.methods.validatePassword = function (requestPassword) {
  return Bcrypt.compareSync(requestPassword, this.password);
};

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  user.password = hashPassword(user.password);

  return next();
});

UserSchema.pre('findOneAndUpdate', function () {
  const password = hashPassword(this.getUpdate().$set.password);

  if (!password) {
    return;
  }

  this.findOneAndUpdate({}, { password: password });
});

export const UserModel = Mongoose.model<IUser>('User', UserSchema);
