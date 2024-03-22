const Post = require("../models/post");
const createPost = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const newPost = new Post({
            title,
            user: userId,
            description,
            content
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully" });
    }
    catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ error: "Failed to create post" });
    }
};

const getPosts = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const posts = await Post.find({ user: userId });

        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { title, description, content } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        post.title = title;
        post.description = description;
        post.content = content;

        await post.save();
        res.json({ message: "Post updated successfully" });
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ error: "Failed to update post" });
    }
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const post = await Post.findById(postId);
    console.log(post);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    if (post.user.toString() !== userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
};

module.exports = { createPost, getPosts, updatePost, deletePost };