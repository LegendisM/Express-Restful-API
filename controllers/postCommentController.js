const { createPostCommentValidator } = require("../validators/postCommentValidator");
const PostCommentMoel = require('../models/PostComment');

exports.read = async (req, res) => {

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

}

exports.delete = async (req, res) => {

}