const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true
});

const Post=mongoose.model("Posts", PostSchema);
module.exports=Post;


