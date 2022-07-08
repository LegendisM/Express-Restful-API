const yup = require('yup');
const { isValidObjectId } = require('mongoose');

exports.createPostCommentValidator = yup.object().shape({
    title: yup.string().required("Please complete the title field"),
    content: yup.string().required("Please complete the content field"),
    owner: yup.string().required("Please complete the owner field").test('objID', 'Invalid Id', (objID) => isValidObjectId(objID)),
    postid: yup.string().required("Please complete the postid field").test('objID', 'Invalid Id', (objID) => isValidObjectId(objID)),
});

exports.editPostCommentValidator = yup.object().shape({
    title: yup.string().required("Please complete the title field"),
    content: yup.string().required("Please complete the content field"),
    id: yup.string().required("Please complete the id field").test('objID', 'Invalid Id', (objID) => isValidObjectId(objID)),
    owner: yup.string().required("Please complete the owner field").test('objID', 'Invalid Id', (objID) => isValidObjectId(objID))
});

exports.deletePostCommentValidator = yup.object().shape({
    id: yup.string().required("Please complete the id field").test('objID', 'Invalid CommentId', (objID) => isValidObjectId(objID)),
    owner: yup.string().required("Please complete the owner field").test('objID', 'Invalid OwnerID', (objID) => isValidObjectId(objID)),
});