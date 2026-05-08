import { inngest } from "../inngest/index.js";
import story from "../models/story.js";
import User from "../models/user.js";
import imagekit from "../configs/imagekit.js";
import { toFile } from "@imagekit/nodejs";

export const addUserStory = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, media_type, background_color } = req.body;
    const media = req.file;

    let media_url = "";

    if ((media_type === "image" || media_type === "video") && media) {
      const response = await imagekit.files.upload({
        file: await toFile(media.buffer, media.originalname),
        fileName: media.originalname,
      });

      media_url = response.url;
    }

    const newStory = await story.create({
      user: userId,
      content,
      media_url,
      media_type,
      background_color,
    });

    await inngest.send({
      name: "app/story.delete",
      data: { storyId: newStory._id },
    });

    res.json({ success: true, story: newStory });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getStories = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);

    const userIds = [
      userId,
      ...(user?.connections || []),
      ...(user?.following || []),
    ];

    const stories = await story
      .find({ user: { $in: userIds } })
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({ success: true, stories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};