const yup = require('yup');

exports.createPostCommentValidator = yup.object().shape({
    title: yup.string().required("Please complete the title field"),
    content: yup.string().required("Please complete the content field"),
    owner: yup.string().required("Please complete the owner field"),
    postid: yup.string().required("Please complete the postid field"),
});