const User = require("../models/user");
const bcrypt = require('bcryptjs');

const createUser = async (email, password) => {

    if (await doesUserExist(email)) {
        throw new Error('User already exists');
    }
    const newUser = new User({email});

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    newUser.username = email.split('@')[0];
    newUser.createdAt = Date.now();

    await newUser.save();
    return newUser;
}


const updateUserPassword = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('User not found');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return user;
}

const doesUserExist = async (email) => {
    const user = await User.findOne({email});
    return !!user;
}

const getUserByEmail = async (email) => {
    return await User.findOne({email});
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    createUser,
    updateUserPassword,
    doesUserExist,
    getUserByEmail,
    comparePassword
}