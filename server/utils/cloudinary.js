import { v2 as cloudinary } from 'cloudinary';
import { config } from './config.js';
import { promises as fs } from 'fs';


cloudinary.config({ 
    cloud_name: config.cloudname, 
    api_key: config.cloudkey, 
    api_secret: config.cloudsecret  
});

export const uploadonCloudinary=async(localFilepath,folder)=>{
    try {
        if(!localFilepath) return null

      const response=  await cloudinary.uploader.upload(localFilepath, {
                resource_type:'image',
                folder
            }
        )
        await fs.unlink(localFilepath);
        return response
    } catch (error) {
        await fs.unlink(localFilepath);
        return null        
    }
}
 