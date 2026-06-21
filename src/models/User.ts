import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: number;
  name: string;
  profession: string;
  email: string;
  phone?: string;
  role: string;
  password?: string;
  picture?: string;
  bio?: string;
  address?: string;
  skills: string[];
  experience?: string;
  website?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  facebookUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    profession: {
      type: String,
      enum: [
        'digital_marketer',
        'full_stack_developer',
        'front_end_developer',
        'back_end_developer',
        'mobile_developer',
        'ui_ux_designer',
        'product_designer',
        'data_analyst',
        'data_engineer',
      ],
      default: 'full_stack_developer',
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    password: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    address: { type: String },
    skills: { type: [String], default: [] },
    experience: { type: String },
    website: { type: String },
    githubUrl: { type: String },
    linkedInUrl: { type: String },
    facebookUrl: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        const retObj = ret as { _id?: unknown };
        delete retObj._id;
      },
    },
  }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
