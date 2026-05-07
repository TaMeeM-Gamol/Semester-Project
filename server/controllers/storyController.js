//add user story

import { inngest } from "../inngest/index.js";
import story from "../models/story.js";
import User from "../models/user.js";

export const addUserStory = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {content, media_type, background_color} = req.body;
        const media = req.file
        let media_url = ''

        //upload media to imagekit
        if (media_type === 'image' || media_type === 'video') {
             const response = await imagekit.files.upload({
           file: await toFile(image.buffer, image.originalname),
           fileName: image.originalname,
            })
            media_url = response.url
        }

        //create story
        const story = await story.create({
            user : userId,
            content,
            media_url,
            background_color,
        })

        //schedule story deletion after 24 hours
        await inngest.send({
            name: 'app/story.delete',
            data: {storyId: story._id}
        })


        res.json({success: true})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//get user stories 
export const getStories = async (req, res) => {
    try {
         const {userId} = req.auth();
         const user = await User.findById(userId)

         //user connections and followings
         const userIds = [userId, ...user.connections, ...user.following]
         const stories = await story.find({
            user: {$in: userIds}
         }).populate('user').sort({createdAt: -1});
         res.json({success: true, stories});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}