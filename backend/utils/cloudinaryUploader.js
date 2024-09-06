const cloudinary = require('../config/cloudinary');

const uploadFile = async (file, folder) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the file buffer to Cloudinary upload stream
      file.stream.pipe(uploadStream);
    });
};

module.exports = uploadFile;