const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dnbntm9w3",
  api_key: "117662251184217",
  api_secret: "EgEaAOHwCldSrc73pL9W6SddeIw",
});

module.exports = cloudinary;