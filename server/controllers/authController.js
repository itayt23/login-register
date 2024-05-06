const {createUser, updateUserPassword, getUserByEmail,comparePassword} = require("../services/user");

const register = async (req, res) => {
    const {email, password} = req.body;

    try {
        await createUser(email, password)
        res.status(200).json({msg: 'User registered successfully'});
    } catch (err) {
        if (err.message === 'User already exists') {
            return res.status(400).json({msg: 'User already exists'});
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const updatePassword = async (req, res) => {
    const {email, password} = req.body;

    try {
        await updateUserPassword(email, password);
        res.status(200).json({msg: 'Password updated successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const verifyLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({msg: 'User not found'});
        }
        await comparePassword(password, user.password)
            ? res.status(200).json({msg: 'Login successful'})
            : res.status(401).json({msg: 'Invalid credentials'});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    register,
    updatePassword,
    verifyLogin
};