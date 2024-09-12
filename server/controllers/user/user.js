import { uploadonCloudinary } from "../../utils/cloudinary.js";

export const userProfile=async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const {user}=req
        const localFilepath = req.file.path;
        const folder='profile'
        const cloudinaryResponse = await uploadonCloudinary(localFilepath,folder);

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

export const userBio=async(req,res)=>{
    try {
        const {name,bio}=req.body;
        const {user}=req;
        console.log("data",name,bio)
        console.log("user",user)

        if (!name) {
            return res.status(400).json({ message: "Name is required to update the profile" });
          }
          if (!bio) {
            return res.status(400).json({ message: "Bio is required to update the profile" });
          }
        user.name=name;
        user.bio=bio;

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {

        return res.status(400).json({ error: error.message });
   
    }
}

