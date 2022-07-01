exports.initialation = async () => {
    
    await require('../models/User').sync();
    await require('../models/Post').sync();
    await require('../models/PostComment').sync();

}