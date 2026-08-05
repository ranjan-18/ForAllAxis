import cloudinary from '../config/cloudinary.js';
import logger from '../utils/logger.js';
import ApiError from '../utils/ApiError.js';

export const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          logger.error(`Cloudinary Upload Error: ${error.message}`);
          return reject(ApiError.internal('Image upload failed'));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      logger.warn(`Cloudinary deletion issue for ${publicId}: ${result.result}`);
    }
    return result;
  } catch (error) {
    logger.error(`Cloudinary Deletion Error: ${error.message}`);
    throw ApiError.internal('Image deletion failed');
  }
};
