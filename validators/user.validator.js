const yup = require('yup');

exports.registerValidator = yup.object().shape({
    username: yup.string().required("Please complete the username field").min(4,"At least 4 characters are required"),
    email: yup.string().email("the email format not correct").required("Please complete the email field"),
    password: yup.string().required("Please complete the password field").min(4,"At least 4 characters are required")
});

exports.loginValidator = yup.object().shape({
    username: yup.string().required("Please complete the username field").min(4,"At least 4 characters are required"),
    password: yup.string().required("Please complete the password field").min(4,"At least 4 characters are required")
});