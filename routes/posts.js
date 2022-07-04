const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');
const { Post: PostAuth } = require('../middlewares/groupAuth');
const postController = require('../controllers/postController');

router.get("/", userAuth, PostAuth.Read, postController.readAll);
router.get("/:id", userAuth, PostAuth.Read, postController.readOne);
router.post("/create", userAuth, PostAuth.Create, postController.create);
router.put("/edit", userAuth, PostAuth.Edit, postController.edit);
router.delete("/edit", userAuth, PostAuth.Delete, postController.delete);

module.exports = router;