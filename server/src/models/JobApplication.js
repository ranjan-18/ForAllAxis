import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    portfolioUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    college: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume link is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'interviewing', 'rejected', 'hired'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
