const bcrypt = require("bcryptjs");
const {User} = require('../../models/user');
const {createError} = require('../../helpers/createError');

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw createError(409, "Email is use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({...req.body, hashPassword});
    res.status(200).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })

}
module.exports = register;