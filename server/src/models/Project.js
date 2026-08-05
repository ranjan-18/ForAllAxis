import mongoose from 'mongoose';
import slugify from 'slugify';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    client: {
      type: String,
    },
    category: {
      type: String,
      enum: ['web-development', 'mobile-app', 'ui-ux', 'branding', 'digital-marketing'],
      required: true,
    },
    technologies: [
      {
        type: String,
      },
    ],
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    thumbnail: {
      url: String,
      publicId: String,
    },
    liveUrl: String,
    githubUrl: String,
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress'],
      default: 'completed',
    },
    completedAt: Date,
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

projectSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
