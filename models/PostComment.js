const mongoose = require('mongoose');

const postCommentSchema = mongoose.Schema({
    title: String,
    content: String,
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    postid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post"
    }
});

const PostComment = mongoose.model("PostComment", postCommentSchema);

module.exports = PostComment;