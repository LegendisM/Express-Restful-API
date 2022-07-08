const yup = require('yup');
const { isValidObjectId } = require('mongoose');

exports.createPostValidator = yup.object().shape({
    title: yup.string().required("Please complete the title field"),
    content: yup.string().required("Please complete the content field")
});

exports.editPostValidator = yup.object().shape({
    title: yup.string().required("Please complete the title field"),
    content: yup.string().required("Please complete the message field")
});

exports.deletePostValidator = yup.object().shape({
    id: yup.string().required("Please complete the id field").test('objID', 'Invalid PostId', (objID) => isValidObjectId(objID)),
    owner: yup.string().required("Please complete the owner field").test('objID', 'Invalid OwnerID', (objID) => isValidObjectId(objID)),
});