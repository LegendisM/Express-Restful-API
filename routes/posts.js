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

module.exports = router;