import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: number;
  userId: number;
  title: string;
  thumbnail: string;
  description: string;
  details?: string;
  features: string;
  category: 'web' | 'api' | 'mobile' | 'other';
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in_progress' | 'planned';
  technologies: string[];
  images?: string[];
  videoUrl?: string;
  metrics?: Array<{ label: string; value: string }>;
  team?: Array<{
    name: string;
    role: string;
    avatar?: string;
    github?: string;
    linkedin?: string;
  }>;
  testimonials?: Array<{
    clientName: string;
    clientCompany: string;
    clientAvatar?: string;
    feedback: string;
    rating: number;
  }>;
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
    details: { type: String },
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
    images: { type: [String], default: [] },
    videoUrl: { type: String },
    metrics: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      default: [],
    },
    team: {
      type: [
        {
          name: { type: String, required: true },
          role: { type: String, required: true },
          avatar: { type: String },
          github: { type: String },
          linkedin: { type: String },
        },
      ],
      default: [],
    },
    testimonials: {
      type: [
        {
          clientName: { type: String, required: true },
          clientCompany: { type: String, required: true },
          clientAvatar: { type: String },
          feedback: { type: String, required: true },
          rating: { type: Number, required: true, default: 5 },
        },
      ],
      default: [],
    },
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
