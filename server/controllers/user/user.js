import { uploadonCloudinary } from "../../utils/cloudinary.js";

export const userProfile=async(req,res)=>{
    console.log("request",req)
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const {user}=req
        const localFilepath = req.file.path;

        const cloudinaryResponse = await uploadonCloudinary(localFilepath);

        if (cloudinaryResponse) {   

            user.profile = cloudinaryResponse.secure_url;

            await user.save();

            res.status(200).json({
                message: 'File uploaded successfully',
                user
            });
        } else {
            res.status(500).send('Failed to upload file.');
        }
    } catch (error) {
        res.status(500).send('Error occurred while uploading file.');
    }
}