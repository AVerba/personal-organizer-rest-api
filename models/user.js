const {Schema, model} = require('mongoose');
const Joi = require('joi')

const regex = require('../helpers/regex/regex');

const userSchema = new Schema(
    {
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            match: regex.emailRegex,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
    }, {versionKey: false, timestamps: true});

const User = model("user", userSchema);

const registerSchema = Joi.object({

    email: Joi.string().pattern(regex.emailRegex).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(regex.emailRegex).required(),
    password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemas={
    register: registerSchema,
    login: loginSchema,
    update: updateSubscriptionSchema
};

module.exports ={
    schemas,
    User,
}