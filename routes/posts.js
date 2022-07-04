const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');
const { Post: PostAuth, PostComment: PostCommentAuth } = require('../middlewares/groupAuth');
const postController = require('../controllers/postController');
const postCommentController = require('../controllers/postCommentController');

//* Post
router.get("/", userAuth, PostAuth.Read, postController.readAll);
router.get("/:id", userAuth, PostAuth.Read, postController.readOne);
router.post("/create", userAuth, PostAuth.Create, postController.create);
router.put("/edit/:id", userAuth, PostAuth.Edit, postController.edit);
router.delete("/delete/:id", userAuth, PostAuth.Delete, postController.delete);

//* Comment Of Post (PROBLEM)
// router.get("/comment", userAuth, PostCommentAuth.Read, postCommentController.create);
// router.get("/comment/:id", userAuth, PostCommentAuth.Read, (req, res) => { });
// router.post("/comment", userAuth, PostCommentAuth.Create, (req, res) => { });
// router.put("/comment/:id", userAuth, PostCommentAuth.Edit, (req, res) => { });
// router.delete("/comment/:id", userAuth, PostCommentAuth.Delete, (req, res) => { });

module.exports = router;