const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');
const { Post: PostAuth } = require('../middlewares/groupAuth');
const postController = require('../controllers/postController');

router.get("/", userAuth, PostAuth.Read, postController.readAll);
router.get("/:id", userAuth, PostAuth.Read, postController.readOne);
router.post("/create", userAuth, PostAuth.Create, postController.create);
router.put("/edit/:id", userAuth, PostAuth.Edit, postController.edit);
router.delete("/delete/:id", userAuth, PostAuth.Delete, postController.delete);

module.exports = router;