import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  description?: string;
  content: string;
  category:
    | 'Technology'
    | 'Web_Development'
    | 'Programming'
    | 'Lifestyle'
    | 'Travel'
    | 'Photography'
    | 'Food'
    | 'Education'
    | 'Business'
    | 'Other';
  tags: string[];
  status: 'published' | 'draft';
  views: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Technology',
        'Web_Development',
        'Programming',
        'Lifestyle',
        'Travel',
        'Photography',
        'Food',
        'Education',
        'Business',
        'Other',
      ],
      default: 'Web_Development',
    },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    views: { type: Number, default: 0 },
    userId: { type: Number, required: true },
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

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;
