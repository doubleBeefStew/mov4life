const cloudinary = require('../config/cloudinary'); // Import Cloudinary
const fs = require('fs');

// Function to upload a single file to Cloudinary
const uploadFileToCloudinary = async (file, folder, resourceType = 'image') => {
  if (!file || file.length === 0) return null;

  try {
    const uploadResponse = await cloudinary.uploader.upload(file[0].path, {
      folder,
      resource_type: resourceType
    });
    
    // Delete the temporary file after upload
    fs.unlinkSync(file[0].path);

    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Cloudinary upload failed');
  }
};

// Function to handle multiple file uploads
const uploadFiles = async (files) => {
  const coverUrl = await uploadFileToCloudinary(files.cover, 'covers');
  const videoUrl = await uploadFileToCloudinary(files.video, 'videos', 'video');

  return { coverUrl, videoUrl };
};

module.exports = {
  uploadFiles
};
