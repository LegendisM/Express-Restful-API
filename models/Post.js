const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;