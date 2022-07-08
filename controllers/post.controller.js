const { createPostValidator, editPostValidator, deletePostValidator } = require('../validators/postValidator');
const PostModel = require('../models/post.model');

exports.readAll = async (req, res) => {
    let posts = await PostModel.find().populate("owner", "username");
    res.status(200).json(posts);
}

exports.readOne = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).json({ status: false, message: 'Invalid id' });
        //* Find Post By ID
        let post = await PostModel.findOne({ _id: req.params.id }).populate("owner", "username");
        if (post)
            res.status(200).json(post);
        else
            res.status(400).json({ state: false, message: "Invalid Post" });
    } catch (err) {
        res.status(400).json({ state: false, message: "Bad Request" });
    }
}

exports.create = async (req, res) => {
    try {
        let { title, content } = req.body;
        let owner = req.session.user._id;
        //* Validate
        let postValidator = await createPostValidator.validateSync({ title, content });
        //* Create the Post
        let post = await PostModel.create({ title, content, owner });
        //* Send Response
        res.status(201).json({ state: true, message: "Post created successfully" });
    } catch (err) {
        res.status(400).json({ state: false, message: err.errors });
    }
}

exports.edit = async (req, res) => {
    try {
        let { title, content } = req.body;
        let postId = req.params.id;
        let owner = req.session.user._id;
        //* Validate
        let postValidator = await editPostValidator.validateSync({ title, content });
        //* Find Post With ID,Owner
        let post = await PostModel.findOne({ _id: postId, owner });
        if (!post) return res.status(400).json({ state: false, message: "Bad Request" });;
        //* Update Post
        post.title = title;
        post.content = content;
        await post.save();
        //* Send Response
        res.status(200).json({ state: true, message: "OK" });
    } catch (err) {
        res.status(400).json({ state: false, message: err.errors || "Bad request" });
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        let owner = req.session.user._id;
        //* Validate
        let postValidator = deletePostValidator.validateSync({ id, owner });
        //* Find Post by ID,Owner
        let post = await PostModel.findOne({ _id: id, owner });
        if (post) {
            //* Delete Post And Send Response
            await post.delete();
            res.status(200).json({ state: true, message: "post deleted successfully" });
        } else {
            res.status(400).json({ state: false, message: "Invalid postID" });
        }
    } catch (err) {
        res.status(400).json({ state: false, message: err.errors });
    }
}