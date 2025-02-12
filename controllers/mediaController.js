//mediaController.js
const cloudinary = require('../config/cloudinaryConfig.js');

const getVisualMediaContent = async (req, res) => {
     try{
         const resources = await cloudinary.api.resources({
             type: 'upload',
             prefix: '',
             resource_type: 'video'
         });

         const media = await resources.resources.map((item) => ({
                 public_id: item.public_id,
                 url: item.secure_url,
                 format: item.format,
                 created_at: item.created_at
         }))
         res.json(media);

     }catch(error)
     {
         console.error('Error fetching media from Cloudinary:', error);
         console.log(error);
     }
}

module.exports.getVisualMediaContent = getVisualMediaContent;