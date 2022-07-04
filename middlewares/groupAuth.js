hasPermission = (request, response, next, groups) => {
    let userGroup = request.session.user.group;

    if (groups.includes(userGroup) || groups.includes("all"))
        next();
    else
        response.status(401).json({ state: false, message: "You do not have enough Permission" });
}

exports.Post = {
    Read: (...args) => hasPermission(...args, ["all"]),
    Create: (...args) => hasPermission(...args, ["superadmin", "admin"]),
    Edit: (...args) => hasPermission(...args, ["superadmin", "admin"]),
    Delete: (...args) => hasPermission(...args, ["superadmin", "admin"]),
    Active: (...args) => hasPermission(...args, ["superadmin"]),
    DeActive: (...args) => hasPermission(...args, ["superadmin"]),
}

exports.PostComment = {
    Read: (...args) => hasPermission(...args, ["all"]),
    Create: (...args) => hasPermission(...args, ["all"]),
    Edit: (...args) => hasPermission(...args, ["all"]),
    Delete: (...args) => hasPermission(...args, ["all"]),
}