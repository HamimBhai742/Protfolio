import mongoose, { Schema, Document } from 'mongoose';

export interface ITimeline extends Document {
  id: number;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  type: 'work' | 'education';
  createdAt: Date;
  updatedAt: Date;
}

const TimelineSchema = new Schema<ITimeline>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    organization: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['work', 'education'],
      required: true,
    },
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

export const Timeline = mongoose.models.Timeline || mongoose.model<ITimeline>('Timeline', TimelineSchema);
export default Timeline;
