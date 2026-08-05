import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Service from '../models/Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/forallaxis');
    console.log('MongoDB Connected for Seeding');

    const adminExists = await User.findOne({ email: 'admin@forallaxis.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@forallaxis.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    const servicesExist = await Service.countDocuments();
    if (servicesExist === 0) {
      await Service.create([
        {
          title: 'Web Development',
          description: 'Full stack custom web applications built with modern technologies.',
          shortDescription: 'Custom web apps',
          features: ['React', 'Node.js', 'MongoDB', 'Express'],
          order: 0
        },
        {
          title: 'UI/UX Design',
          description: 'Beautiful, intuitive user interfaces and user experiences.',
          shortDescription: 'Intuitive designs',
          features: ['Figma', 'Wireframing', 'Prototyping'],
          order: 1
        }
      ]);
      console.log('Sample services created');
    }

    console.log('Data Seeding Completed Successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during data seeding:', error);
    process.exit(1);
  }
};

seedData();
