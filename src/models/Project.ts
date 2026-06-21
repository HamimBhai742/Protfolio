import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: number;
  userId: number;
  title: string;
  thumbnail: string;
  description: string;
  features: string;
  category: 'web' | 'api' | 'mobile' | 'other';
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in_progress' | 'planned';
  technologies: string[];
  startDate: string;
  endDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: String, required: true },
    category: {
      type: String,
      enum: ['web', 'api', 'mobile', 'other'],
      required: true,
    },
    githubUrl: { type: String },
    liveUrl: { type: String },
    status: {
      type: String,
      enum: ['completed', 'in_progress', 'planned'],
      required: true,
    },
    technologies: { type: [String], default: [] },
    startDate: { type: String, required: true },
    endDate: { type: String },
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

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
