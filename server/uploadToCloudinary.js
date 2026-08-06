import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesToUpload = [
  { path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\35f57212-e629-4e12-9d53-977f1acd9951\\healthcare_industry_1786020327785.jpg', name: 'healthcare' },
  { path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\35f57212-e629-4e12-9d53-977f1acd9951\\ecommerce_industry_1786020351399.jpg', name: 'ecommerce' },
  { path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\35f57212-e629-4e12-9d53-977f1acd9951\\finance_industry_1786020372181.jpg', name: 'finance' },
  { path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\35f57212-e629-4e12-9d53-977f1acd9951\\realestate_industry_1786020427806.jpg', name: 'realestate' },
  { path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\35f57212-e629-4e12-9d53-977f1acd9951\\tech_industry_1786020439787.jpg', name: 'tech' }
];

async function uploadImages() {
  const results = {};
  for (const img of imagesToUpload) {
    try {
      const response = await cloudinary.uploader.upload(img.path, {
        folder: 'forallaxis/industries',
        public_id: img.name
      });
      results[img.name] = response.secure_url;
      console.log(`Uploaded ${img.name}: ${response.secure_url}`);
    } catch (err) {
      console.error(`Error uploading ${img.name}:`, err.message);
    }
  }
  console.log('\n--- FINAL URLS ---');
  console.log(JSON.stringify(results, null, 2));
}

uploadImages();
