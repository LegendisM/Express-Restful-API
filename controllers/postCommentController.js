const { createPostCommentValidator, editPostCommentValidator, deletePostCommentValidator } = require("../validators/postCommentValidator");
const PostCommentMoel = require('../models/PostComment');

exports.read = async (req, res) => {
    try {
        let postid = req.params.postid;
        let comments = await PostCommentMoel.find({ postid }).populate("owner", "username");
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ state: false, message: "Invalid Request" });
    }
}

exports.create = async (req, res) => {
    try {
        let { title, content, postid } = req.body;
        let owner = req.session.user._id;
        //* Validate
        let postCommentValidator = await createPostCommentValidator.validateSync({ title, content, postid, owner });
        //* Create Comment
        let comment = await PostCommentMoel.create({ title, content, postid, owner });
        //* Send Response
        res.status(201).json({ state: false, message: "comment created successfully" });
    } catch (err) {
        res.status(400).json({ state: false, message: err.errors });
    }
};

exports.edit = async (req, res) => {
    try {
        let id = req.params.id;
        let { title, content } = req.body;
        let owner = req.session.user._id;
        //* Validate
        let postCommentValidator = await editPostCommentValidator.validateSync({ title, content, id, owner });
        //* Find and Update Comment by ID
        let comment = await PostCommentMoel.findOneAndUpdate({ _id: id }, { title, content });
        //* Send Response Of Result
        if (comment)
            res.status(200).json({ state: true, message: "The Comment Modifiy" });
        else
            res.status(400).json({ state: false, message: "Invalid Comment To Modifiy" });
    } catch (err) {
        res.status(400).json({ state: false, message: err.errors });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        let owner = req.session.user._id;
        //* Validate
        let postCommentValidator = await deletePostCommentValidator.validateSync({ id, owner });
        //* Find Comment
        let comment = await PostCommentMoel.findOne({ _id: id, owner });
        if (comment) {
            //* Delete comment And Send Response
            await comment.delete();
            res.status(200).json({ state: true, message: "comment deleted successfully" });
        } else {
            res.status(400).json({ state: false, message: "Invalid comment" });
        }
    } catch (err) {
        res.status(400).json({ state: false, message: err.errors });
    }
}