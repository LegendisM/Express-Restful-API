const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');
const { Post: PostAuth, PostComment: PostCommentAuth } = require('../middlewares/groupAuth');
const postController = require('../controllers/postController');
const postCommentController = require('../controllers/postCommentController');

// @desc Find All Posts
// @route GET /post
router.get("/", userAuth, PostAuth.Read, postController.readAll);

// @desc Find One Post By ID
// @route GET /post/:id
router.get("/:id", userAuth, PostAuth.Read, postController.readOne);

// @desc Create One Post
// @route POST /post/create
// @body title , content
router.post("/create", userAuth, PostAuth.Create, postController.create);

// @desc Edit One Post By ID
// @route PUT /post/edit/:id
// @body title , content
router.put("/edit/:id", userAuth, PostAuth.Edit, postController.edit);

// @desc Delete One Post By ID
// @route DELETE /post/delete/:id
router.delete("/delete/:id", userAuth, PostAuth.Delete, postController.delete);

// ** Post Comment ** 

// @desc Get Comments Of Post By Post ID
// @route GET /post/comment/:postid
router.get("/comment/:id", userAuth, PostCommentAuth.Read, postCommentController.read);

// @desc Create Comment
// @route POST /post/comment
// @body title , content , postid
router.post("/comment", userAuth, PostCommentAuth.Create, postCommentController.create);

// @desc Update Comment By ID
// @route PUT /post/comment/:id
// @body title , content
router.put("/comment/:id", userAuth, PostCommentAuth.Edit, postCommentController.edit);

// @desc Delete Comment By ID
// @route DELETE /post/comment/:id
router.delete("/comment/:id", userAuth, PostCommentAuth.Delete, postCommentController.delete);

module.exports = router;