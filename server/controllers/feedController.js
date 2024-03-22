const User = require("../models/user");
const Post = require("../models/post");

const feed = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const following = user.following_ids;
        console.log(following);
        const posts = await Post.find({ user: { $in: following } });
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { feed };