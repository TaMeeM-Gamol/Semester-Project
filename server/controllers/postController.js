import imagekit from "../configs/imagekit.js";
import Post from "../models/Post.js";
import User from "../models/user.js";
import { toFile } from "@imagekit/nodejs"
// add post 

export const addPost = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {content, post_type} = req.body;
        const images = req.files;

        let image_urls = []

        if (images.length) {
           image_urls = await Promise.all(
           images.map(async (image) => {
           

           const response = await imagekit.files.upload({
           file: await toFile(image.buffer, image.originalname),
           fileName: image.originalname,
            })

           return response.url
           })

        )
       }
       
       await Post.create({
        user: userId,
        content,
        image_urls,
        post_type
       })
       res.json({success: true, message:"post created successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message});
    }
}

//get post

export const getFeedPost = async (req, res) => {
   try {
     const {userId} = req.auth()
     const user = await User.findById(userId)

     //user connections and following
     const userIds = [userId, ...user.connections, ...user.following]
     const posts = await Post.find({user: {$in: userIds}}).populate('user').sort({createdAt: -1});
     res.json({success: true, posts})

   } catch (error) {
    console.log(error);
        res.json({success: true, message: error.message});
    
   }
}

//like post 

export const likePost = async (req, res) => {
   try {
     const {userId} = req.auth()
     const {postId} = req.body;
     
     const post = await Post.findById(postId)

     if (post.likes_count.includes(userId)) {
        post.likes_count = post.likes_count.filter(user => user !== userId)
        await post.save()
        res.json({success: true, message: 'post unliked'});
     }else{
        post.likes_count.push(userId)
        await post.save()
        res.json({success: true, message: 'post liked'});
     }

   } catch (error) {
    console.log(error);
        res.json({success: true, message: error.message});
    
   }
}