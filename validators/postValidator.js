const yup = require('yup');

exports.createPostValidator = yup.object().shape({
    title: yup.string().required("Please complete the title field"),
    content: yup.string().required("Please complete the content field")
});

exports.editPostValidator = yup.object().shape({
    title: yup.string().required("Please complete the title field"),
    content: yup.string().required("Please complete the message field")
});