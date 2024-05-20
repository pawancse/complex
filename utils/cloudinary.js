const cloudinary = require('cloudinary').v2;
const { uuid } = require('uuidv4');
const db = require('../model/images');
const cloudinaryConnect = async function () {
    cloudinary.config({
        cloud_name: process.env.imageCloudName,
        api_key: process.env.imageApiKey,
        api_secret: process.env.imageApiSecret
    });
};

exports.uploadProfilePic = async function (userId, imageUrl) {
    let publicId = uuid();
    //connect Cloudinary
    await cloudinaryConnect();
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        public_id: publicId
    }).catch((error) => { console.log(error) });
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto',
        crop: 'auto',
        gravity: 'auto',
        width: 50,
        height: 50,
    });
    console.log(optimizeUrl);
    let result = db.createImageInDb(userId, uploadResult.asset_id, uploadResult.public_id, uploadResult.version, uploadResult.version_id, uploadResult.signature, uploadResult.width, uploadResult.height, uploadResult.format, uploadResult.resource_type, uploadResult.created_at, uploadResult.tags, uploadResult.bytes, uploadResult.type, uploadResult.placeholder, uploadResult.url, uploadResult.secure_url, optimizeUrl, uploadResult.folder, uploadResult.original_filename, uploadResult.api_key);    
    return result;
};